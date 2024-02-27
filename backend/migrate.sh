MIGRATE=1

if [ $MIGRATE -eq 1 ]; then
    php artisan config:clear
    php artisan config:cache
    php artisan cache:clear
    php artisan migrate
    # php artisan db:seed --class=SportSeeder
    # php artisan db:seed --class=CourtSeeder
    # php artisan db:seed --class=UserSeeder
    # php artisan db:seed --class=ReservationSeeder
fi
