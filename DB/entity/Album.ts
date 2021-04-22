import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import {Song} from './Song';
import {AlbumCountry} from './AlbumCountry';

@Entity()
export class Album {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @OneToMany( (type) => Song, (song) => song.album )
    public songs: Song[];

    @ManyToOne( (type) => AlbumCountry, (albumcountry) => albumcountry.name )
    public country: AlbumCountry[];

}
