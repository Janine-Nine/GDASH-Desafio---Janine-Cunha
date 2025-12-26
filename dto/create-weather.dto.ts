import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateWeatherDto {
  @IsDateString() timestamp: string;
  @IsString() location: string;
  @IsOptional() @IsNumber() temperature?: number;
  @IsOptional() @IsNumber() humidity?: number;
  @IsOptional() @IsNumber() windSpeed?: number;
  @IsOptional() @IsString() condition?: string;
  @IsOptional() raw?: any;
}