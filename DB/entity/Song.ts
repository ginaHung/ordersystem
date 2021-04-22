import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Album} from "./Album";
import {Singer} from "./Singer";
@Entity()
export class Song {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @ManyToOne((type) => Album, (album) => album.songs)
    public album: Album;

    @OneToMany((type) => Singer, (singer) => singer.song)
    public singers: Singer[];

}
