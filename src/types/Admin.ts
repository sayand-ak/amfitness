import mongoose from "mongoose";

export interface IAdmin {
    _id?: string;
    username?: string;
    email: string;
    password: string;
  }
  