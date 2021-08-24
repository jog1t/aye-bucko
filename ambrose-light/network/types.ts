import { MapSchema, Schema } from "@colyseus/schema";

export interface PlayerState {
  name: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export interface PlayerSchema extends Schema, PlayerState {}

export interface PlayersSchema {
  players: MapSchema<PlayerSchema>;
}
