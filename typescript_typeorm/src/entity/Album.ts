import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
// import {Song} from './Song';

@Entity()
export class Album {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    // @OneToMany( (type) => Song, (song) => song.album )
    // public songs: Song[];

}
