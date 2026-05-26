-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('GOVERNMENT', 'PRIVATE', 'DEEMED');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('UG', 'PG', 'DOCTORATE');

-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "establishedYear" INTEGER,
    "overview" TEXT NOT NULL,
    "accreditation" TEXT,
    "rating" DECIMAL(2,1) NOT NULL,
    "averageFees" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "duration" TEXT NOT NULL,
    "annualFees" INTEGER NOT NULL,
    "totalSeats" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "placementRate" DECIMAL(5,2) NOT NULL,
    "averagePackageLpa" DECIMAL(5,2) NOT NULL,
    "highestPackageLpa" DECIMAL(5,2) NOT NULL,
    "topRecruiters" TEXT[],

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntranceExam" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EntranceExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cutoff" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "examId" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'GENERAL',
    "openingRank" INTEGER NOT NULL,
    "closingRank" INTEGER NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cutoff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_slug_key" ON "College"("slug");

-- CreateIndex
CREATE INDEX "College_city_idx" ON "College"("city");

-- CreateIndex
CREATE INDEX "College_state_idx" ON "College"("state");

-- CreateIndex
CREATE INDEX "College_rating_idx" ON "College"("rating");

-- CreateIndex
CREATE INDEX "College_averageFees_idx" ON "College"("averageFees");

-- CreateIndex
CREATE INDEX "Course_stream_idx" ON "Course"("stream");

-- CreateIndex
CREATE INDEX "Course_annualFees_idx" ON "Course"("annualFees");

-- CreateIndex
CREATE UNIQUE INDEX "Placement_collegeId_key" ON "Placement"("collegeId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "EntranceExam_code_key" ON "EntranceExam"("code");

-- CreateIndex
CREATE INDEX "Cutoff_closingRank_idx" ON "Cutoff"("closingRank");

-- CreateIndex
CREATE INDEX "Cutoff_category_idx" ON "Cutoff"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Cutoff_collegeId_examId_courseName_category_round_key" ON "Cutoff"("collegeId", "examId", "courseName", "category", "round");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cutoff" ADD CONSTRAINT "Cutoff_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cutoff" ADD CONSTRAINT "Cutoff_examId_fkey" FOREIGN KEY ("examId") REFERENCES "EntranceExam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
