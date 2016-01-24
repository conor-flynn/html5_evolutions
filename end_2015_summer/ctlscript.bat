@echo off
rem START or STOP Services
rem ----------------------------------
rem Check if argument is STOP or START

if not ""%1"" == ""START"" goto stop

if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\hypersonic\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\server\hsql-sample-database\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\ingres\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\ingres\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\postgresql\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\postgresql\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\openoffice\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\openoffice\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache-tomcat\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache-tomcat\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\resin\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\resin\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jboss\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jboss\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jetty\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jetty\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\subversion\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\subversion\scripts\ctl.bat START)
rem RUBY_APPLICATION_START
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\lucene\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\lucene\scripts\ctl.bat START)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\third_application\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\third_application\scripts\ctl.bat START)
goto end

:stop
echo "Stopping services ..."
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\third_application\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\third_application\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\lucene\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\lucene\scripts\ctl.bat STOP)
rem RUBY_APPLICATION_STOP
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\subversion\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\subversion\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jetty\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jetty\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\hypersonic\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\server\hsql-sample-database\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jboss\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\jboss\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\resin\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\resin\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache-tomcat\scripts\ctl.bat (start /MIN /B /WAIT D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache-tomcat\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\openoffice\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\openoffice\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\ingres\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\ingres\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\scripts\ctl.bat STOP)
if exist D:\Users\conor\Desktop\coplex\2d\end_2015_summer\postgresql\scripts\ctl.bat (start /MIN /B D:\Users\conor\Desktop\coplex\2d\end_2015_summer\postgresql\scripts\ctl.bat STOP)

:end

