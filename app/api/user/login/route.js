// app/api/user/login/route.js

import { NextResponse } from "next/server"
import { SignJWT } from "jose"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

export async function POST(request) {
  try {
    const reqBody = await request.json()
    
    await connectDB()
    const savedUserData = await UserModel.findOne({email: reqBody.email})
    
    if(savedUserData){
      if(reqBody.password === savedUserData.password){ // 厳密等価演算子を使用
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const payload = {
          email: reqBody.email,
        }
        
        const token = await new SignJWT(payload)
          .setProtectedHeader({alg: "HS256"})
          .setExpirationTime("1d")
          .sign(secretKey)
        
        return NextResponse.json({
          message: "ログイン成功", 
          token: token
        })
      } else {
        return NextResponse.json(
          { message: "ログイン失敗：パスワードが間違っています" },
          { status: 401 }
        )
      }
    } else {
      return NextResponse.json(
        { message: "ログイン失敗：ユーザー登録をしてください" },
        { status: 404 }
      )
    }
  } catch(err) {
    console.error("ログインエラー:", err)
    return NextResponse.json(
      { message: "ログイン失敗", error: err.message },
      { status: 500 }
    )
  }
}