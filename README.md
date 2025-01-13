Buat file .env yang isinya demikian: DATABASE_URL="postgresql://postgres:admin@localhost:5432/parkhub?schema=public"

Di contoh tersebut, postgres adalah username, admin adalah password, dan parkhub adalah nama database yang telah dibuat di PG Admin, sesuaikan untuk username dan passwordnya sesuai yang kalian punya.

Bukalah PG Admin dan buatlah database yang bernama parkhub kemudian ketiklah perintah ini pada terminal: "npx prisma migrate dev".

Jika belum memiliki folder dist, maka jalankan perintah ini: "npm run build".

Jika sudah, cobalah seeding manual menggunakan thunderclient dengan menyesuaikan route pada file public-router maupun protected-router. 

Jika sudah berhasil register / login user pada thunderclient, jangan lupa copy token nya dan masukan pada header, pergi ke bagian "Headers" dan di row ketiga untuk header name ganti dengan "X-API-TOKEN" lalu untuk value nya ganti dengan token yang sudah anda copy.

Selamat mencoba!
