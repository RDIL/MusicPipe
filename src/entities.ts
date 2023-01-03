import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
} from "typeorm"

export interface JsonStringifyable {
    toJSON(): any
}

export function stringifyAll<T extends JsonStringifyable>(arr: T[]): any[] {
    return arr.map((x) => x.toJSON())
}

export interface ApiUser extends JsonStringifyable {
    id: string
    name: string
    username: string
}

@Entity({ name: "users" })
export class User implements ApiUser {
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
}

export interface ApiSong extends JsonStringifyable {
    id: string
    title: string
    album: ApiAlbum | null
    primaryArtists: ApiArtist[]
    writers: ApiArtist[]
    producers: ApiArtist[]
    featuredArtists: ApiArtist[]
}

@Entity({ name: "songs" })
export class Song implements ApiSong {
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            album: this.album?.toJSON() || null,
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

    @ManyToOne(() => Album, (album) => album.id, { nullable: true })
    album!: Album | null

    @OneToMany(() => Artist, (artist) => artist.id)
    primaryArtists!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    writers!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    producers!: Artist[]

    @OneToMany(() => Artist, (artist) => artist.id)
    featuredArtists!: Artist[]
}

export interface ApiArtist extends JsonStringifyable {
    id: string
    name: string
}

@Entity({ name: "artists" })
export class Artist implements ApiArtist {
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
}

export interface ApiAlbum extends JsonStringifyable {
    id: string
    title: string
    primaryArtists: ApiArtist[]
    tracklist: ApiSong[]
}

@Entity({ name: "albums" })
export class Album implements ApiAlbum {
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
}
