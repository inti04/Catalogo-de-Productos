@echo off
echo Inicializando la base de datos...
mysql -u root -pApositivo2004* catalogo < catalogo_productos.sql
if %errorlevel% equ 0 (
    echo ¡Base de datos inicializada correctamente!
) else (
    echo Error al inicializar la base de datos. Verifica las credenciales y la ruta del script.
)
pause