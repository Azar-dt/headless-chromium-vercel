/* eslint-disable  */
import { NextRequest, NextResponse } from "next/server";

import { createPdf } from "@/libs/pdf";

export async function GET(req: NextRequest) {
  try {
    const pdfBuffer = await createPdf(`https://www.google.com`);

    return NextResponse.json(true);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
        },
      },
      { status: 500 }
    );
  }
}
