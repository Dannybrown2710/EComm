export const logger = function()
{
    var consoleLog = null;
    var consoleInfo = null;
    var consoleWarn = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(consoleLog == null || consoleInfo==null || consoleWarn==null)
                                return;

                            window['console']['log'] = consoleLog;
                            window['console']['info'] = consoleInfo;
                            window['console']['warn'] = consoleWarn;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            console.clear();
                            consoleLog = console.log;
                            consoleInfo = console.info;
                            consoleWarn = console.warn;
                            window['console']['log'] = function() {};
                            window['console']['info'] = function() {};
                            window['console']['warn'] = function() {};
                        };

    return pub;
}();