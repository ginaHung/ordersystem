import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Song} from './Song';
@Entity()
export class Singer {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public gender: string;

    @ManyToOne((type) => Song, (song) => song.singers)
    public song: Song;

}
