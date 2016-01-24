@echo off
rem START or STOP Services
rem ----------------------------------
rem Check if argument is STOP or START

if not ""%1"" == ""START"" goto stop


"D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\bin\mysqld" --defaults-file="D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\bin\my.ini" --standalone --console
if errorlevel 1 goto error
goto finish

:stop
"D:\Users\conor\Desktop\coplex\2d\end_2015_summer\apache\bin\pv" -f -k mysqld.exe -q

if not exist "D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\data\%computername%.pid" goto finish
echo Delete %computername%.pid ...
del "D:\Users\conor\Desktop\coplex\2d\end_2015_summer\mysql\data\%computername%.pid"
goto finish


:error
echo MySQL could not be started

:finish
exit
