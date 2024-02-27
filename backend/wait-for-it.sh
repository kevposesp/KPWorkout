#!/bin/sh
# Script para esperar a que un contenedor esté disponible en un puerto específico y la base de datos esté creada

host="$1"
port="$2"
db_name="$3"
timeout="${4:-30}" # tiempo máximo de espera, por defecto 30 segundos

echo "Esperando a que $host:$port esté disponible..."

# Esperar a que el contenedor de MySQL esté en funcionamiento en el puerto especificado
while ! nc -z "$host" "$port" >/dev/null 2>&1; do
  timeout=$((timeout - 1))
  if [ "$timeout" -eq 0 ]; then
    echo "Se ha alcanzado el tiempo de espera máximo. No se pudo conectar a $host:$port."
    exit 1
  fi
  sleep 1
done

echo "$host:$port está disponible."
echo "Esperando a que la base de datos $db_name esté creada en $host..."

# Esperar a que la base de datos esté creada
while ! mysql -h "$host" -u "$MYSQL_USER_ROOT" -p"$MYSQL_ROOT_PASSWORD" -e "use $db_name" >/dev/null 2>&1; do
  timeout=$((timeout - 1))
  if [ "$timeout" -eq 0 ]; then
    echo "Se ha alcanzado el tiempo de espera máximo. No se pudo conectar a la base de datos $db_name en $host."
    exit 1
  fi
  sleep 1
done

echo "Base de datos $db_name está creada en $host."
