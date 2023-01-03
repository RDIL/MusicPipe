import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

export interface JsonStringifyable {
    toJSON(): any
}

export function stringifyAll<T extends JsonStringifyable>(arr: T[]): any[] {
    return arr.map((x) => x.toJSON())
}

export interface ApiUser {
    id: string
    name: string
    username: string
}

@Entity({ name: "users" })
export class User implements ApiUser, JsonStringifyable {
    toJSON(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
        }
    }

    static keys = ["id", "name", "username"]

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar" })
    name!: string

    @Column({ type: "varchar", unique: true })
    username!: string

    static from(id: string, name: string, username: string): User {
        const user = new User()
        user.id = id
        user.name = name
        user.username = username
        return user
    }
}

export interface ApiSong {
    id: string
    title: string
    albums: ApiAlbum[]
    primaryArtists: ApiArtist[]
    writers: ApiArtist[]
    producers: ApiArtist[]
    featuredArtists: ApiArtist[]
}

@Entity({ name: "songs" })
export class Song implements ApiSong, JsonStringifyable {
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            albums: stringifyAll(this.albums),
            primaryArtists: stringifyAll(this.primaryArtists),
            writers: stringifyAll(this.writers),
            producers: stringifyAll(this.producers),
            featuredArtists: stringifyAll(this.featuredArtists),
        }
    }

    static keys = [
        "id",
        "title",
        "album",
        "primaryArtists",
        "writers",
        "producers",
        "featuredArtists",
    ]

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar" })
    title!: string

    @OneToMany(() => Album, (album) => album.id)
    albums!: Album[]

    @OneToMany(() => Artist, (artist) => artist.id)
    primaryArtists!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    writers!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    producers!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    featuredArtists!: Artist[]

    static from(id: string, title: string): Song {
        const song = new Song()
        song.id = id
        song.title = title
        song.albums = []
        song.primaryArtists = []
        song.writers = []
        song.producers = []
        song.featuredArtists = []
        return song
    }
}

export interface ApiArtist {
    id: string
    name: string
}

@Entity({ name: "artists" })
export class Artist implements ApiArtist, JsonStringifyable {
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        }
    }

    static keys = ["id", "name"]

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar" })
    name!: string

    static from(id: string, name: string): Artist {
        const artist = new Artist()
        artist.id = id
        artist.name = name
        return artist
    }
}

export interface ApiAlbum {
    id: string
    title: string
    primaryArtists: ApiArtist[]
    tracklist: ApiSong[]
}

@Entity({ name: "albums" })
export class Album implements ApiAlbum, JsonStringifyable {
    toJSON(): any {
        return {
            id: this.id,
            title: this.title,
            primaryArtists: stringifyAll(this.primaryArtists),
            tracklist: stringifyAll(this.tracklist),
        }
    }

    static keys = ["id", "title", "primaryArtists", "tracklist"]

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: "varchar", nullable: true })
    title!: string

    @OneToMany(() => Artist, (artist) => artist.id)
    primaryArtists!: Artist[]

    @OneToMany(() => Song, (song) => song.id)
    tracklist!: Song[]

    static from(id: string, title: string, primaryArtists: Artist): Album {
        const album = new Album()
        album.id = id
        album.title = title
        album.primaryArtists = [primaryArtists]
        album.tracklist = []
        return album
    }
}
