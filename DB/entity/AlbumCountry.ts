import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Album} from './Album';

@Entity()
export class AlbumCountry {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @OneToMany((type) => Album, (album) => album.country)
    public album: Album;

}
