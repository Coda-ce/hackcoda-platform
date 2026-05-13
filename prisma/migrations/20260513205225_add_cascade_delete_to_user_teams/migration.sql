-- DropForeignKey
ALTER TABLE "user_teams" DROP CONSTRAINT "user_teams_teamId_fkey";

-- DropForeignKey
ALTER TABLE "user_teams" DROP CONSTRAINT "user_teams_userId_fkey";

-- AddForeignKey
ALTER TABLE "user_teams" ADD CONSTRAINT "user_teams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_teams" ADD CONSTRAINT "user_teams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;
