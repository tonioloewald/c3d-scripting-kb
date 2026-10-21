// Source: https://www.cheetah3d.com/forum/index.php?threads/13505/post-118235
// Author: jdmac (Cheetah3D forum), posted 2019-10-29
// Thread: "Dynamically update text value of Text Spline Object"
// Treated as CC-BY: credit the author above. Archived unmodified below.
// ---------------------------------------------------------------------
/*
 * Time of Day.js
 *
 * Created by Jerry McCreary at 10/28/19
 *
 * Put in Tag Script folder of Cheetah3D
 */


function buildUI(tag) {
    tag.addParameterLink("Skylight", true);
}

function performExpression(tag) {

    try {
        var owner = tag.owner();
        var doc = tag.document();
        var sun = tag.getParameter("Skylight");
        var d;
        var sun_d;
        var minutes;
        var seconds;

        try {
            sun_d = sun.getParameter('date');  // minutes since new year
            minutes = Math.floor(sun_d);
            seconds = 60 * (sun_d - minutes);
            d = new Date(2019, 0, 1, 0, minutes, seconds); // the actual year is not relevant

        } catch (err_3) {
            print("ERROR:");
            print(err_3);
        }

        owner.setParameter("text", d.toString());

    } catch (err) {
        print("ERROR:");
        print(err);

    }

}
