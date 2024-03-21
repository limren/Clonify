-- CreateTable
CREATE TABLE "_UserArtistLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserAlbumLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTrackLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserArtistLikes_AB_unique" ON "_UserArtistLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserArtistLikes_B_index" ON "_UserArtistLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserAlbumLikes_AB_unique" ON "_UserAlbumLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAlbumLikes_B_index" ON "_UserAlbumLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTrackLikes_AB_unique" ON "_UserTrackLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTrackLikes_B_index" ON "_UserTrackLikes"("B");

-- AddForeignKey
ALTER TABLE "_UserArtistLikes" ADD CONSTRAINT "_UserArtistLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserArtistLikes" ADD CONSTRAINT "_UserArtistLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAlbumLikes" ADD CONSTRAINT "_UserAlbumLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAlbumLikes" ADD CONSTRAINT "_UserAlbumLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTrackLikes" ADD CONSTRAINT "_UserTrackLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTrackLikes" ADD CONSTRAINT "_UserTrackLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
