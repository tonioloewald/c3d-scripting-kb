// Source: https://www.cheetah3d.com/forum/index.php?threads/1161/post-7325
// Author: ToddWR (Cheetah3D forum), posted 2006-12-19
// Thread: "Let the sun shine in..."
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
//	The Sun.js
//
// Todd Rogers
// Usage: Place this into scripts/Tool folder. restart Cheetah3D, then select from Tools -> Scritp -> Tool Script
// this javascript is taken from the following site:
//	http://www.srrb.noaa.gov/highlights/sunrise/azel.html
//
//	12/18/06  V1 : first release



//***********************************************************************/
//*	DATA STRUCTURES														*/
//***********************************************************************/

function month(name, numdays, abbr) 
{
	this.name = name;
	this.numdays = numdays;
	this.abbr = abbr;
}

//*********************************************************************/

function ans(daySave,value)
{
	this.daySave = daySave;
	this.value = value;
}

//*********************************************************************/

//function city(name, lat, lng, zoneHr) 
//{
//	this.name = name;
//	this.lat = lat;
//	this.lng = lng;
//	this.zoneHr = zoneHr;
//}
//


var monthList = new Array();
var YesNo = new Array();
// valid time zones from http://en.wikipedia.org/wiki/UTC
// the last entery of 15 is for the search loop and is not really used
var TimeZones = new Array(-12,-11,-10,-9.5,-9,-8,-7,-6,-5,-4,-3.5,-3,-2.5,-2,-1,0,1,2,3,3.5,4,4.5,5,5.5,5.75,6,6.5,7,8,8.75,9,9.75,9.5,10,10.5,11,11.5,12,12.75,13,13.75,14,15);
var The_Sun = null;

function fetchPreferences(tool,save) {
	var path = "/Library/Application Support/Cheetah3D";
	var file = new File(path);
	// if it is not there create a dir
	if( !file.exist()) {
		file.mkdir();
	}
	if( file.isDir()) {
		path = path + "/The_Sun.pref";
		file = new File(path);
		if( file.exist() && !save) {
			var str;
			//print("reading file");
			file.open(READ_MODE);
			str = file.readln(); tool.setParameter("North", 1 * str);
			str = file.readln(); tool.setParameter("Distance", 1 * str);
			str = file.readln(); tool.setParameter("longitude", 1 * str);
			str = file.readln(); tool.setParameter("lon min", 1 * str);
			str = file.readln(); tool.setParameter("lon sec", 1 * str);
			str = file.readln(); tool.setParameter("latitude", 1 * str);
			str = file.readln(); tool.setParameter("lat min", 1 * str);
			str = file.readln(); tool.setParameter("lat sec", 1 * str);
			str = file.readln(); tool.setParameter("Year", 1 * str);
			str = file.readln(); tool.setParameter("Month", 1 * str);
			str = file.readln(); tool.setParameter("Day", 1 * str);
			str = file.readln(); tool.setParameter("UT Offset", 1 * str);
			str = file.readln(); tool.setParameter("Hour", 1 * str);
			str = file.readln(); tool.setParameter("Minute", 1 * str);
			str = file.readln(); tool.setParameter("Seconds", 1 * str);
			str = file.readln(); tool.setParameter("Daylight Savings Time", 1 * str);
			file.close();
		} else {
			//print("writing file");
			file.open(WRITE_MODE);
			file.writeln("" + tool.getParameter("North"));
			file.writeln("" + tool.getParameter("Distance"));
			file.writeln("" + tool.getParameter("longitude"));
			file.writeln("" + tool.getParameter("lon min"));
			file.writeln("" + tool.getParameter("lon sec"));
			file.writeln("" + tool.getParameter("latitude"));
			file.writeln("" + tool.getParameter("lat min"));
			file.writeln("" + tool.getParameter("lat sec"));
			file.writeln("" + tool.getParameter("Year"));
			file.writeln("" + tool.getParameter("Month"));
			file.writeln("" + tool.getParameter("Day"));
			file.writeln("" + tool.getParameter("UT Offset"));
			file.writeln("" + tool.getParameter("Hour"));
			file.writeln("" + tool.getParameter("Minute"));
			file.writeln("" + tool.getParameter("Seconds"));
			file.writeln("" + tool.getParameter("Daylight Savings Time"));
			file.close();
		}
	}
}

function buildUI(tool){
    
    tool.addParameterSeparator("The Sun.js");
	tool.addParameterInt("North",0,-180,180,true,true);
	tool.addParameterFloat("Distance",1,.001,100,true,true);
    tool.addParameterSeparator("Location");
	tool.addParameterInt("longitude",122,-180,180,true,true);
	tool.addParameterInt("lon min",19,0,59,true,true);
	tool.addParameterInt("lon sec",0,0,59,true,true);
	
	tool.addParameterInt("latitude",47,-89.8,89.8,true,true);
	tool.addParameterInt("lat min",36,0,59,true,true);
	tool.addParameterInt("lat sec",0,0,59,true,true);
	
    tool.addParameterSeparator("The time");
	tool.addParameterInt("Year",1961,-500,3000,true,true);
	tool.addParameterInt("Month",12,1,12,true,true);
	tool.addParameterInt("Day",17,1,31,true,true);
	// add things here to force this to be a valid value
	tool.addParameterFloat("UT Offset",-8,-12,14,true,true);
	tool.addParameterInt("Hour",12,0,23,true,true);
	tool.addParameterInt("Minute",0,0,59,true,true);
	tool.addParameterInt("Seconds",0,0,59,true,true);
	tool.addParameterBool("Daylight Savings Time",false,false,true,true,true);
	
	tool.addParameterButton("Adjust the","Sun","makeIt");
    tool.addParameterSeparator("-");
    tool.addParameterButton("About/Help ","Help","showIt");
	//	list of months and days for non-leap year
	var i = 0;
	monthList[i++] = new month("January", 31, "Jan");
	monthList[i++] = new month("February", 28, "Feb");
	monthList[i++] = new month("March", 31, "Mar");
	monthList[i++] = new month("April", 30, "Apr");
	monthList[i++] = new month("May", 31, "May");
	monthList[i++] = new month("June", 30, "Jun");
	monthList[i++] = new month("July", 31, "Jul");
	monthList[i++] = new month("August", 31, "Aug");
	monthList[i++] = new month("September", 30, "Sep");
	monthList[i++] = new month("October", 31, "Oct");
	monthList[i++] = new month("November", 30, "Nov");
	monthList[i++] = new month("December", 31, "Dec");

	//Daylight Saving array	
	i=0;
	YesNo[i++] = new ans("No",0);
	YesNo[i++] = new ans("Yes",60);
    var  doc=tool.document();
    var  root=doc.root();
	var obj = iterateTree(root,"The_Sun");
	if( obj != null) {
		// if there is an object 'Sun' already get the distance to it
		var pos = obj.getParameter("position");
		var len = Math.sqrt(pos.x*pos.x + pos.y*pos.y + pos.z*pos.z);
		tool.setParameter("Distance",len);
	}
	// if a file is already there read them if not save them
	fetchPreferences(tool,false);
}

function round(x) {
	return Math.floor(x*1000)/1000;
}

function makeIt(tool) {
    var  doc=tool.document();
    var  root=doc.root();
    
	var obj = iterateTree(root,"The_Sun");
	if( obj == null) {
		OS.messageBox("Error","There is no light source called 'The_Sun'");
		return;
	}
	fetchPreferences(tool,true); // save the settings here
	ang = calcSun(tool);
	if( ang == "Bad")
		return;
	var len = tool.getParameter("Distance");
	var north = tool.getParameter("North");
	var pos = new Vec3D(len,0,0);
//	print((-ang.x-north)+","+(ang.y));
	if( ang.y < 0) 
		OS.messageBox("Alert!!","The sun is below the horizon.");
	var m = new Mat4D(ROTATE_HPB,-ang.x-north,0,ang.y);
	pos = m.multiply(pos);
	obj.setParameter("position",pos);
}


function showIt(tool){
	OS.messageBox("About / Help","The Sun\r\
by Todd Rogers.\r\r\
To use:	Create a light source object.\r\
		Name the light object 'The_Sun'.\r\
		Enter your lon & lat.\r\
		Enter the year,month and day.\r\
		Enter the hour, minute and second.\r\
		Click 'Sun' to set the position of the light source.\r\
	");
}

function iterateTree(obj,str){
    var	i;
	var result = null;
    for(i=0;i<obj.childCount();i++){
		var  curr=obj.childAtIndex(i);
		var  objtype=curr.type();
		
		if(objtype==LIGHT || objtype==POINTLIGHT || objtype==SPOTLIGHT || objtype==AREALIGHT || objtype==DISTANTLIGHT){
			var	n = curr.getParameter("name");
			if( str == n )  {
				result = curr;
				break;
			}
		}
		if( result == null ) {
			result = iterateTree(curr,str);
			if(result != null)
				break;
		}
	}
	return result;
}
//
//	var City = new Array();
//
//	j = 0;
//	City[j++] = new city("Enter Lat/Long -->",0,0,0);
//	City[j++] = new city("",0,0,0);
//	City[j++] = new city("US CITIES",0,0,0);
//	City[j++] = new city("Albuquerque, NM", 35.0833,106.65,7);
//	City[j++] = new city("Anchorage, AK", 61.217, 149.90,9);
//	City[j++] = new city("Atlanta, GA", 33.733, 84.383, 5);
//	City[j++] = new city("Austin, TX", 30.283, 97.733, 6);
//	City[j++] = new city("Birmingham, AL", 33.521, 86.8025, 6);
//	City[j++] = new city("Bismarck, ND", 46.817, 100.783, 6);
//	City[j++] = new city("Boston, MA", 42.35, 71.05, 5);
//	City[j++] = new city("Boulder, CO", 40.125, 105.237, 7);
//	City[j++] = new city("Chicago, IL", 41.85,87.65,6);
//	City[j++] = new city("Dallas, TX", 32.46, 96.47,6);
//	City[j++] = new city("Denver, CO", 39.733, 104.983, 7);
//	City[j++] = new city("Detroit, MI", 42.333, 83.05, 5);
//	City[j++] = new city("Honolulu, HI", 21.30, 157.85, 10);
//	City[j++] = new city("Houston, TX", 29.75, 95.35, 6);
//	City[j++] = new city("Indianapolis, IN", 39.767, 86.15, 5);
//	City[j++] = new city("Jackson, MS", 32.283, 90.183, 6);
//	City[j++] = new city("Kansas City, MO", 39.083, 94.567,6);
//	City[j++] = new city("Los Angeles, CA",34.05,118.233,8);
//	City[j++] = new city("Menomonee Falls, WI",43.11,88.10,6);
//	City[j++] = new city("Miami, FL", 25.767, 80.183,5);
//	City[j++] = new city("Minneapolis, MN", 44.967, 93.25, 6);
//	City[j++] = new city("New Orleans, LA", 29.95, 90.067, 6);
//	City[j++] = new city("New York City, NY", 40.7167, 74.0167, 5);
//	City[j++] = new city("Oklahoma City, OK", 35.483, 97.533,6);
//	City[j++] = new city("Philadelphia, PA", 39.95, 75.15, 5);
//	City[j++] = new city("Phoenix, AZ",33.433,112.067,7);
//	City[j++] = new city("Pittsburgh, PA",40.433,79.9833,5);
//	City[j++] = new city("Portland, ME", 43.666, 70.283, 5);
//	City[j++] = new city("Portland, OR", 45.517, 122.65, 8);
//	City[j++] = new city("Raleigh, NC", 35.783, 78.65, 5);
//	City[j++] = new city("Richmond, VA", 37.5667, 77.450, 5);
//	City[j++] = new city("Saint Louis, MO", 38.6167,90.1833,6);
//	City[j++] = new city("San Diego, CA", 32.7667, 117.2167, 8);
//	City[j++] = new city("San Francisco, CA",37.7667,122.4167,8);
//	City[j++] = new city("Seattle, WA",47.60,122.3167,8);
//	City[j++] = new city("Washington DC", 38.8833, 77.0333,5);
//	City[j++] = new city("",0,0,0);
//	City[j++] = new city("WORLD CITIES",0,0,0);
//	City[j++] = new city("Beijing, China",39.9167, -116.4167,-8);
//	City[j++] = new city("Berlin, Germany",52.33, -13.30, -1);
//	City[j++] = new city("Bombay, India", 18.9333, -72.8333, -5.5);
//	City[j++] = new city("Buenos Aires, Argentina", -34.60,58.45,3);
//	City[j++] = new city("Cairo, Egypt", 30.10,-31.3667,-2);
//	City[j++] = new city("Cape Town, South Africa",-33.9167,-18.3667,-2);
//	City[j++] = new city("Caracas, Venezuela", 10.50,66.9333,4);
//	City[j++] = new city("Helsinki, Finland", 60.1667, -24.9667,-2);
//	City[j++] = new city("Hong Kong, China", 22.25,-114.1667, -8);
//	City[j++] = new city("Jerusalem, Israel", 31.7833, -35.2333, -2);
//	City[j++] = new city("London, England", 51.50, 0.1667,0);
//	City[j++] = new city("Mexico City, Mexico", 19.4,99.15,6);
//	City[j++] = new city("Moscow, Russia", 55.75, -37.5833, -3);
//	City[j++] = new city("New Delhi, India",28.6, -77.2, -5.5);
//	City[j++] = new city("Ottawa, Canada", 45.41667,75.7,5);
//	City[j++] = new city("Paris, France", 48.8667, -2.667, -1);
//	City[j++] = new city("Rio de Janeiro, Brazil",-22.90,43.2333,3);
//	City[j++] = new city("Riyadh, Saudi Arabia", 24.633, -46.71667, -3);
//	City[j++] = new city("Rome, Italy",41.90, -12.4833,-1);
//	City[j++] = new city("Sydney, Australia",-33.8667,-151.2167,-10);
//	City[j++] = new city("Tokyo, Japan", 35.70, -139.7667, -9); 
//	City[j++] = new city("Zurich, Switzerland", 47.3833, -8.5333,-1);
//	City[j++] = new city("",0,0,0);
//	City[j++] = new city("SURFRAD NETWORK",0,0,0);
//	City[j++] = new city("Goodwin Creek, MS",34.2544444,89.8738888, 6);
//	City[j++] = new city("Fort Peck, MT",48.310555,105.1025, 7);
//	City[j++] = new city("Bondville, IL",40.055277,88.371944, 6);
//	City[j++] = new city("Table Mountain, CO",40.125,105.23694, 7);
//	City[j++] = new city("Desert Rock, NV",36.626,116.018,8);
//	City[j++] = new city("Penn State, PA",40.72,77.93,5);
//	City[j++] = new city("Canaan Valley, WV", 39.1, 79.4, 5);
//	City[j++] = new city("Sioux Falls, SD", 43.733, 96.6233, 6);
//	City[j++] = new city("",0,0,0);
//	City[j++] = new city("ARM/CART NETWORK",0,0,0);
//	City[j++] = new city("Atqasuk, AK", 70.47215, 157.4078, 9);
//	City[j++] = new city("Barrow, AK", 71.30,156.683, 9);
//	City[j++] = new city("Manus Island, PNG", -2.06, -147.425,-10);
//	City[j++] = new city("Nauru Island", -0.52, -166.92, -12);
//	City[j++] = new city("Darwin, Australia", -12.425, -130.891, -9.5);
//	City[j++] = new city("SGP Central Facility", 36.6167, 97.5, 6);
//	City[j++] = new city("",0,0,0);
//	City[j++] = new city("ISIS NETWORK",0,0,0);
//	City[j++] = new city("Albuquerque, NM", 35.04, 106.62,7);
//	City[j++] = new city("Bismarck, ND", 46.77, 100.77,6);
//	City[j++] = new city("Hanford, CA", 36.31, 119.63,8);
//	City[j++] = new city("Madison, WI", 43.13, 89.33,6);	
//	City[j++] = new city("Oak Ridge, TN", 35.96, 84.37,5);
//	City[j++] = new city("Salt Lake City, UT", 40.77,111.97,7);
//	City[j++] = new city("Seattle, WA", 47.68, 122.25,8);
//	City[j++] = new city("Sterling, VA", 38.98, 77.47,5);
//	City[j++] = new city("Tallahassee, FL", 30.38, 84.37,5);

//*********************************************************************/
//	'isLeapYear' returns '1' if the yr is a leap year, '0' if it is not.

	function isLeapYear(yr) 
	{
		return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
	}

//*********************************************************************/
//	'isValidInput' makes sure valid input is entered before calculating
//	the sunrise and sunset.  False is returned if an invalid entry was made,
//	true if the entry is valid.
function isValidInput(tool) {
	var y = tool.getParameter("Year");
	var m = tool.getParameter("Month");
	var d = tool.getParameter("Day");
//	For the non-February months see if the day entered is greater than
//	the number of days in the selected month
	var index = m - 1;
	if ((index != 1) && (d > monthList[index].numdays)) {
		OS.messageBox("Error","There are only " + monthList[index].numdays + " days in " + monthList[index].name + ".");
		return false;
	}

//	First see if the year entered is a leap year.  If so we have to make sure
//	the days entered is <= 29.  If not a leap year we make sure that the days
//	entered is <= 28.

	else if (index == 1) {	//	 month selected is February 
		if (isLeapYear(y)) {	//	year is a leap year
			if (d > (monthList[index].numdays + 1)) {
				OS.messageBox("Error","There are only " + (monthList[index].numdays + 1) + " days in " + monthList[index].name + ".");
				return false;
			} else
				return true;
		} else {	//	year entered is not a leap year
			if (d > monthList[index].numdays) {
				OS.messageBox("Error","There are only " +  monthList[index].numdays +  " days in " + monthList[index].name + ".");
				return false;
			} else
				return true;
		}
	} else 
		return true;	
}


//***********************************************************************/
//***********************************************************************/
//*																		*/
//*This section contains subroutines used in calculating solar position */
//*																		*/
//***********************************************************************/
//***********************************************************************/
// Convert radian angle to degrees

function radToDeg(angleRad) 
{
	return (180.0 * angleRad / Math.PI);
}

//*********************************************************************/
// Convert degree angle to radians

function degToRad(angleDeg) 
{
	return (Math.PI * angleDeg / 180.0);
}

//*********************************************************************/


//***********************************************************************/
//* Name:    calcDayOfYear												*/
//* Type:    Function													*/
//* Purpose: Finds numerical day-of-year from mn, day and lp year info  */
//* Arguments:															*/
//*   month: January = 1												*/
//*   day  : 1 - 31														*/
//*   lpyr : 1 if leap year, 0 if not									*/
//* Return value:														*/
//*   The numerical day of year											*/
//***********************************************************************/
function calcDayOfYear(mn, dy, lpyr) 
{
	var k = (lpyr ? 1 : 2);
	var doy = Math.floor((275 * mn)/9) - k * Math.floor((mn + 9)/12) + dy -30;
	return doy;
}


//***********************************************************************/
//* Name:    calcDayOfWeek												*/
//* Type:    Function													*/
//* Purpose: Derives weekday from Julian Day							*/
//* Arguments:															*/
//*   juld : Julian Day													*/
//* Return value:														*/
//*   String containing name of weekday									*/
//***********************************************************************/
function calcDayOfWeek(juld)
{
	var A = (juld + 1.5) % 7;
	var DOW = (A==0)?"Sunday":(A==1)?"Monday":(A==2)?"Tuesday":(A==3)?"Wednesday":(A==4)?"Thursday":(A==5)?"Friday":"Saturday";
	return DOW;
}


//***********************************************************************/
//* Name:    calcJD														*/
//* Type:    Function													*/
//* Purpose: Julian day from calendar day								*/
//* Arguments:															*/
//*   year : 4 digit year												*/
//*   month: January = 1												*/
//*   day  : 1 - 31														*/
//* Return value:														*/
//*   The Julian day corresponding to the date							*/
//* Note:																*/
//*   Number is returned for start of day.  Fractional days should be	*/
//*   added later.														*/
//***********************************************************************/
function calcJD(year, month, day)
{
	if (month <= 2) {
		year -= 1;
		month += 12;
	}
	var A = Math.floor(year/100);
	var B = 2 - A + Math.floor(A/4);

	var JD = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + day + B - 1524.5;
	return JD;
}


//***********************************************************************/
//* Name:    calcDateFromJD												*/
//* Type:    Function													*/
//* Purpose: Calendar date from Julian Day								*/
//* Arguments:															*/
//*   jd   : Julian Day													*/
//* Return value:														*/
//*   String date in the form DD-MONTHNAME-YYYY							*/
//* Note:																*/
//***********************************************************************/
function calcDateFromJD(jd)
{
	var z = Math.floor(jd + 0.5);
	var f = (jd + 0.5) - z;

	if (z < 2299161) {
		var A = z;
	} else {
		alpha = Math.floor((z - 1867216.25)/36524.25);
		var A = z + 1 + alpha - Math.floor(alpha/4);
	}

	var B = A + 1524;
	var C = Math.floor((B - 122.1)/365.25);
	var D = Math.floor(365.25 * C);
	var E = Math.floor((B - D)/30.6001);

	var day = B - D - Math.floor(30.6001 * E) + f;
	var month = (E < 14) ? E - 1 : E - 13;
	var year = (month > 2) ? C - 4716 : C - 4715;

	// alert ("date: " + day + "-" + monthList[month-1].name + "-" + year);
	return (day + "-" + monthList[month-1].name + "-" + year);
}


//***********************************************************************/
//* Name:    calcDayFromJD												*/
//* Type:    Function													*/
//* Purpose: Calendar day (minus year) from Julian Day					*/
//* Arguments:															*/
//*   jd   : Julian Day													*/
//* Return value:														*/
//*   String date in the form DD-MONTH									*/
//***********************************************************************/

function calcDayFromJD(jd)
{
	var z = Math.floor(jd + 0.5);
	var f = (jd + 0.5) - z;

	if (z < 2299161) {
		var A = z;
	} else {
		alpha = Math.floor((z - 1867216.25)/36524.25);
		var A = z + 1 + alpha - Math.floor(alpha/4);
	}

	var B = A + 1524;
	var C = Math.floor((B - 122.1)/365.25);
	var D = Math.floor(365.25 * C);
	var E = Math.floor((B - D)/30.6001);

	var day = B - D - Math.floor(30.6001 * E) + f;
	var month = (E < 14) ? E - 1 : E - 13;
	var year = (month > 2) ? C - 4716 : C - 4715;

	return ((day<10 ? "0" : "") + day + monthList[month-1].abbr);
}


//***********************************************************************/
//* Name:    calcTimeJulianCent											*/
//* Type:    Function													*/
//* Purpose: convert Julian Day to centuries since J2000.0.				*/
//* Arguments:															*/
//*   jd : the Julian Day to convert									*/
//* Return value:														*/
//*   the T value corresponding to the Julian Day						*/
//***********************************************************************/

function calcTimeJulianCent(jd)
{
	var T = (jd - 2451545.0)/36525.0;
	return T;
}


//***********************************************************************/
//* Name:    calcJDFromJulianCent										*/
//* Type:    Function													*/
//* Purpose: convert centuries since J2000.0 to Julian Day.				*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   the Julian Day corresponding to the t value						*/
//***********************************************************************/

function calcJDFromJulianCent(t)
{
	var JD = t * 36525.0 + 2451545.0;
	return JD;
}


//***********************************************************************/
//* Name:    calGeomMeanLongSun											*/
//* Type:    Function													*/
//* Purpose: calculate the Geometric Mean Longitude of the Sun			*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   the Geometric Mean Longitude of the Sun in degrees				*/
//***********************************************************************/

function calcGeomMeanLongSun(t)
{
	var L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
	while(L0 > 360.0)
	{
		L0 -= 360.0;
	}
	while(L0 < 0.0)
	{
		L0 += 360.0;
	}
	return L0;		// in degrees
}


//***********************************************************************/
//* Name:    calGeomAnomalySun											*/
//* Type:    Function													*/
//* Purpose: calculate the Geometric Mean Anomaly of the Sun			*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   the Geometric Mean Anomaly of the Sun in degrees					*/
//***********************************************************************/

function calcGeomMeanAnomalySun(t)
{
	var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
	return M;		// in degrees
}

//***********************************************************************/
//* Name:    calcEccentricityEarthOrbit									*/
//* Type:    Function													*/
//* Purpose: calculate the eccentricity of earth's orbit				*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   the unitless eccentricity											*/
//***********************************************************************/

function calcEccentricityEarthOrbit(t)
{
	var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
	return e;		// unitless
}

//***********************************************************************/
//* Name:    calcSunEqOfCenter											*/
//* Type:    Function													*/
//* Purpose: calculate the equation of center for the sun				*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   in degrees														*/
//***********************************************************************/

function calcSunEqOfCenter(t)
{
	var m = calcGeomMeanAnomalySun(t);

	var mrad = degToRad(m);
	var sinm = Math.sin(mrad);
	var sin2m = Math.sin(mrad+mrad);
	var sin3m = Math.sin(mrad+mrad+mrad);

	var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
	return C;		// in degrees
}

//***********************************************************************/
//* Name:    calcSunTrueLong											*/
//* Type:    Function													*/
//* Purpose: calculate the true longitude of the sun					*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun's true longitude in degrees									*/
//***********************************************************************/

function calcSunTrueLong(t)
{
	var l0 = calcGeomMeanLongSun(t);
	var c = calcSunEqOfCenter(t);

	var O = l0 + c;
	return O;		// in degrees
}

//***********************************************************************/
//* Name:    calcSunTrueAnomaly											*/
//* Type:    Function													*/
//* Purpose: calculate the true anamoly of the sun						*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun's true anamoly in degrees										*/
//***********************************************************************/

function calcSunTrueAnomaly(t)
{
	var m = calcGeomMeanAnomalySun(t);
	var c = calcSunEqOfCenter(t);

	var v = m + c;
	return v;		// in degrees
}

//***********************************************************************/
//* Name:    calcSunRadVector											*/
//* Type:    Function													*/
//* Purpose: calculate the distance to the sun in AU					*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun radius vector in AUs											*/
//***********************************************************************/

function calcSunRadVector(t)
{
	var v = calcSunTrueAnomaly(t);
	var e = calcEccentricityEarthOrbit(t);

	var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
	return R;		// in AUs
}

//***********************************************************************/
//* Name:    calcSunApparentLong										*/
//* Type:    Function													*/
//* Purpose: calculate the apparent longitude of the sun				*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun's apparent longitude in degrees								*/
//***********************************************************************/

function calcSunApparentLong(t)
{
	var o = calcSunTrueLong(t);

	var omega = 125.04 - 1934.136 * t;
	var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
	return lambda;		// in degrees
}

//***********************************************************************/
//* Name:    calcMeanObliquityOfEcliptic								*/
//* Type:    Function													*/
//* Purpose: calculate the mean obliquity of the ecliptic				*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   mean obliquity in degrees											*/
//***********************************************************************/

function calcMeanObliquityOfEcliptic(t)
{
	var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
	var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
	return e0;		// in degrees
}

//***********************************************************************/
//* Name:    calcObliquityCorrection									*/
//* Type:    Function													*/
//* Purpose: calculate the corrected obliquity of the ecliptic			*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   corrected obliquity in degrees									*/
//***********************************************************************/

function calcObliquityCorrection(t)
{
	var e0 = calcMeanObliquityOfEcliptic(t);

	var omega = 125.04 - 1934.136 * t;
	var e = e0 + 0.00256 * Math.cos(degToRad(omega));
	return e;		// in degrees
}

//***********************************************************************/
//* Name:    calcSunRtAscension											*/
//* Type:    Function													*/
//* Purpose: calculate the right ascension of the sun					*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun's right ascension in degrees									*/
//***********************************************************************/

function calcSunRtAscension(t)
{
	var e = calcObliquityCorrection(t);
	var lambda = calcSunApparentLong(t);

	var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
	var tanadenom = (Math.cos(degToRad(lambda)));
	var alpha = radToDeg(Math.atan2(tananum, tanadenom));
	return alpha;		// in degrees
}

//***********************************************************************/
//* Name:    calcSunDeclination											*/
//* Type:    Function													*/
//* Purpose: calculate the declination of the sun						*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   sun's declination in degrees										*/
//***********************************************************************/

function calcSunDeclination(t)
{
	var e = calcObliquityCorrection(t);
	var lambda = calcSunApparentLong(t);

	var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
	var theta = radToDeg(Math.asin(sint));
	return theta;		// in degrees
}

//***********************************************************************/
//* Name:    calcEquationOfTime											*/
//* Type:    Function													*/
//* Purpose: calculate the difference between true solar time and mean	*/
//*		solar time														*/
//* Arguments:															*/
//*   t : number of Julian centuries since J2000.0						*/
//* Return value:														*/
//*   equation of time in minutes of time								*/
//***********************************************************************/

function calcEquationOfTime(t)
{
	var epsilon = calcObliquityCorrection(t);
	var l0 = calcGeomMeanLongSun(t);
	var e = calcEccentricityEarthOrbit(t);
	var m = calcGeomMeanAnomalySun(t);

	var y = Math.tan(degToRad(epsilon)/2.0);
	y *= y;

	var sin2l0 = Math.sin(2.0 * degToRad(l0));
	var sinm   = Math.sin(degToRad(m));
	var cos2l0 = Math.cos(2.0 * degToRad(l0));
	var sin4l0 = Math.sin(4.0 * degToRad(l0));
	var sin2m  = Math.sin(2.0 * degToRad(m));

	var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
			- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

	return radToDeg(Etime)*4.0;	// in minutes of time
}



// Return the hour angle for the given location, decl, and time of day
function calcHourAngle(time, longitude, eqtime) {
	return (15.0*(time - (longitude/15.0) - (eqtime/60.0)));
	// in degrees
}


// Returns decimal latitude from deg, min, sec entered in the form	
function getLatitude(tool) {
	var decLat;
	var degs = tool.getParameter("latitude");
	var mins = tool.getParameter("lat min");
	var secs = tool.getParameter("lat sec");

	if(degs >= 0)
		decLat = degs + (mins / 60) + (secs / 3600);
	else
		decLat = degs - (mins / 60) - (secs / 3600);
	return decLat;

}	

// Returns decimal longitude from the deg, min, sec entered in the form	
function getLongitude(tool) {
	var neg = 0;
	var decLon;
	var degs = tool.getParameter("longitude");
	var mins = tool.getParameter("lon min");
	var secs = tool.getParameter("lon sec");
	if(degs >= 0)
		decLon = degs + (mins / 60) + (secs / 3600);
	else
		decLon = degs - (mins / 60) - (secs / 3600);
	return decLon;
}


// *****************************************************
// *****************************************************
// ***********  Main calculation routine  **************
// *****************************************************
// *****************************************************

//***********************************************************************/
//* Name:    calcSun													*/
//* Type:    Main Function called by form controls						*/
//* Purpose: calculate solar position for the entered date, time and	*/
//*		location.  Results are reported in azimuth and elevation		*/
//*		(in degrees) and cosine of solar zenith angle.					*/
//* Arguments:															*/
//*   riseSetForm : for displaying results								*/
//*   latLongForm : for reading latitude and longitude data				*/
//*   index : daylight saving yes/no select								*/
//*   index2 : city select index										*/
//* Return value:														*/
//*   none																*/
//*	(fills riseSetForm text fields with results of calculations)		*/
//***********************************************************************/

function calcSun(tool) 
{
	var latitude = getLatitude(tool);
	var longitude = getLongitude(tool);
	if (isValidInput(tool)) {
		var zone = tool.getParameter("UT Offset");
		var daySavings = YesNo[tool.getParameter("Daylight Savings Time")].value;  // = 0 (no) or 60 (yes)
		var i;
		// force zone to be equal to a valid time zone
		for( i=0;i<TimeZones.length - 1;i++) {
			if(zone >= TimeZones[i] && zone < TimeZones[i+1]){
				zone = TimeZones[i];
				tool.setParameter("UT Offset",zone);
				break;
			}
		}

		var ss = tool.getParameter("Seconds");
		var mm = tool.getParameter("Minute");
		var hh = tool.getParameter("Hour") - (daySavings/60);
		
		var yy = tool.getParameter("Year");
		var m = tool.getParameter("Month");
		var dd = tool.getParameter("Day");

		// timenow is GMT time for calculation
		var timenow = hh + mm/60 + ss/3600 + zone;	// in hours since 0Z
		//alert("timenow = " + timenow);


		var JD = calcJD(yy, m, dd);
		var dow = calcDayOfWeek(JD);
		var doy = calcDayOfYear(m, dd, isLeapYear(yy));
		var T = calcTimeJulianCent(JD + timenow/24.0); 
		//var L0 = calcGeomMeanLongSun(T);
		//var M = calcGeomMeanAnomalySun(T);
		//var e = calcEccentricityEarthOrbit(T);
		//var C = calcSunEqOfCenter(T);
		//var O = calcSunTrueLong(T);
		//var v = calcSunTrueAnomaly(T);
		var R = calcSunRadVector(T);
		//var lambda = calcSunApparentLong(T);
		//var epsilon0 = calcMeanObliquityOfEcliptic(T);
		//var epsilon = calcObliquityCorrection(T);
		var alpha = calcSunRtAscension(T);
		var theta = calcSunDeclination(T);
		var Etime = calcEquationOfTime(T);

		var eqTime = Etime;
		var solarDec = theta; // in degrees
		var earthRadVec = R;
		var solarTimeFix = eqTime - 4.0 * longitude + 60.0 * zone;
		var trueSolarTime = hh * 60.0 + mm + ss/60.0 + solarTimeFix;
		// in minutes
		while (trueSolarTime > 1440) 
			trueSolarTime -= 1440;

		//var hourAngle = calcHourAngle(timenow, longitude, eqTime);
		var hourAngle = trueSolarTime / 4.0 - 180.0;
		// Thanks to Louis Schwarzmayr for finding our error,
		// and providing the following 2 lines to fix it:
		if (hourAngle < -180) 
			hourAngle += 360.0;

		var haRad = degToRad(hourAngle);
		var csz = Math.sin(degToRad(latitude)) * Math.sin(degToRad(solarDec)) + Math.cos(degToRad(latitude)) * Math.cos(degToRad(solarDec)) * Math.cos(haRad);
		if (csz > 1.0) {
			csz = 1.0;
		} else if (csz < -1.0) { 
			csz = -1.0; 
		}
		var zenith = radToDeg(Math.acos(csz));
		var azDenom = ( Math.cos(degToRad(latitude)) * Math.sin(degToRad(zenith)) );
		if (Math.abs(azDenom) > 0.001) {
			azRad = (( Math.sin(degToRad(latitude)) * Math.cos(degToRad(zenith)) ) - Math.sin(degToRad(solarDec))) / azDenom;
			if (Math.abs(azRad) > 1.0) {
				if (azRad < 0) {
					azRad = -1.0;
				} else {
					azRad = 1.0;
				}
			}
			var azimuth = 180.0 - radToDeg(Math.acos(azRad));
			if (hourAngle > 0.0) {
				azimuth = -azimuth;
			}
		} else {
			if (latitude > 0.0) {
				azimuth = 180.0;
			} else { 
				azimuth = 0.0;
			}
		}
		if (azimuth < 0.0) {
			azimuth += 360.0;
		}

		var exoatmElevation = 90.0 - zenith;
		var refractionCorrection;
		if (exoatmElevation > 85.0) {
			refractionCorrection = 0.0;
		} else {
			te = Math.tan (degToRad(exoatmElevation));
			if (exoatmElevation > 5.0) {
				refractionCorrection = 58.1 / te - 0.07 / (te*te*te) + 0.000086 / (te*te*te*te*te);
			} else if (exoatmElevation > -0.575) {
				refractionCorrection = 1735.0 + exoatmElevation * (-518.2 + exoatmElevation * (103.4 + exoatmElevation * (-12.79 + exoatmElevation * 0.711) ) );
			} else {
				refractionCorrection = -20.774 / te;
			}
			refractionCorrection = refractionCorrection / 3600.0;
		}

		var solarZen = zenith - refractionCorrection;
		var result = new Vec3D(azimuth,90.0-solarZen,0);
		return result;
//		if(solarZen < 108.0) { // astronomical twilight	
//		  riseSetForm["azimuth"].value = (Math.floor(1000*azimuth))/1000;
//		  riseSetForm["elevation"].value = (Math.floor(1000*(90.0 - solarZen)))/1000;
//		} else {  // do not report az & el after astro twilight
//		  riseSetForm["azimuth"].value = "dark";
//		  riseSetForm["elevation"].value = "dark";
//		}
	} else
		return "Bad";
}

