-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_cpf_key" ON "customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
