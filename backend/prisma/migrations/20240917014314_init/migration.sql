-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "dateBirth" TIMESTAMP(3) NOT NULL,
    "cityOrigin" TEXT NOT NULL,
    "registerDate" TIMESTAMP(3) NOT NULL,
    "hospitalOrigin" TEXT NOT NULL,
    "tutorName" TEXT NOT NULL,
    "tutorTelephone" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
