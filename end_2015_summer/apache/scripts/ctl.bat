@echo off

if not ""%1"" == ""START"" goto stop

cmd.exe /C start /B /MIN "" "D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\bin\httpd.exe"

if errorlevel 255 goto finish
if errorlevel 1 goto error
goto finish

:stop
"D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\bin\pv" -f -k httpd.exe -q
if not exist "D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\logs\httpd.pid" GOTO finish
del "D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\logs\httpd.pid"
goto finish

:error
echo Error starting Apache

:finish
exit
