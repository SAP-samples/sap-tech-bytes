sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'uimodule/test/integration/FirstJourney',
		'uimodule/test/integration/pages/ListOfBooksList',
		'uimodule/test/integration/pages/ListOfBooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, ListOfBooksList, ListOfBooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('uimodule') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheListOfBooksList: ListOfBooksList,
					onTheListOfBooksObjectPage: ListOfBooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);