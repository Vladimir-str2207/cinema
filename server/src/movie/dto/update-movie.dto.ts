import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  minLength,
} from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({ type: String, minLength: 3, maxLength: 30 })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1900)
  @Max(2025)
  year?: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @Min(1)
  @Max(999)
  duration?: number;

  @ApiProperty({ type: [String] })
  @IsString()
  genre?: string[];

  @ApiProperty({ type: [String] })
  @IsString()
  director?: string[];

  @ApiProperty({ type: [String] })
  @IsString()
  reviews?: string[];

  @ApiProperty({ type: String })
  @IsString()
  poster_path: string;

  @ApiProperty({ type: String })
  video_path?: string;

  @ApiProperty({ type: String, description: 'описание фильма' })
  @IsString()
  description?: string;
}
