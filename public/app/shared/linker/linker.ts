/**
 * Created by SoraMusoka on 07.11.2014.
 */

/// <reference path="../../types/clientTypes.d.ts" />
/// <reference path="../../baseController.ts" />
/// <reference path="../../global.ts" />

module APP_LINKER {

    function Filter() {
        return (input) => {
            var words = input.split(' ');
            _.each(words, (w:string, i:number) => {
                if (w.indexOf('@') === 0) {
                    words[i] = '<a href="#/dashboard" class="subject-link">' + w.substring(1) + '</a>';
                }
                else if (w.indexOf('#') === 0) {
                    words[i] = '<a href="#/dashboard">' + w.substring(1) + '</a>';
                }
            });

            return words.join(' ');
        };
    }

    angular
        .module('app.linkerFilter', [])
        .filter('linker', Filter);
}
