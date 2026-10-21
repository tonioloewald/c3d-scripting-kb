// Source: https://www.cheetah3d.com/forum/index.php?threads/13505/post-118231
// Author: jdmac (Cheetah3D forum), posted 2019-10-28
// Thread: "Dynamically update text value of Text Spline Object"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 * Time of Day.js
 *
 * Created by Jerry McCreary at 10/28/19
 */


function buildUI(tag) {
    tag.addParameterLink("Skylight", true);
}

function performExpression(tag) {

        var owner = tag.owner();
        var doc = tag.document();
        var sun = tag.getParameter("Skylight");
        var d;
        var dt;

        try {
            d = sun.getParameter('date');  // <-- ACTUAL value from Skylight
            dt = new Date(d);                  // <-- NOT an accurate date

            print("SUN DATE: "
                 + d.toString() + " "
                 + dt.getMonth().toString() + "/"
                 + dt.getDate().toString() + " "
                 + dt.getHours().toString() + ":" + dt.getMinutes().toString());
            print("*************************");


        } catch (err) {
            print("********* ERROR *********");
            print(err);
            print("*************************");
        }

        owner.setParameter("text", d.toString());  // <-- ASSIGNING retrieved value to Text Spline

}