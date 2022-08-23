-- CreateTable
CREATE TABLE "Municipality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiscData" (
    "id" SERIAL NOT NULL,
    "bump_at" TIMESTAMP(3) NOT NULL,
    "up_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MiscData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedMessage" (
    "id" SERIAL NOT NULL,
    "discord_channel_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "FixedMessage_pkey" PRIMARY KEY ("id")
);
