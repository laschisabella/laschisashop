-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "stock" INTEGER;
