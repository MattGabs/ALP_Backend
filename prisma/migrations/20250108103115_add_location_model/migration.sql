-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "isFilled" BOOLEAN NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);
