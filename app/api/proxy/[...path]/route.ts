import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function middlewareHandler(
  req: NextRequest,
  path: string[],
): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value;
  console.log("API URL:", API_URL);

  const targetUrl = `${API_URL}/${path.join("/")}`;
  console.log("Target URL:", targetUrl);

  const headers = new Headers(req.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const fetchOptions: RequestInit = {
    method: req.method,
    headers,
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
  };

  const response = await fetch(targetUrl, fetchOptions);

  if (response.status === 401) {
    // TODO: Handle token refresh logic here
  }

  const responseBody = await response.arrayBuffer();
  const proxyResponse = new NextResponse(responseBody, {
    status: response.status,
    headers: response.headers,
  });

  return proxyResponse;
}

// Handler for all HTTP methods
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return middlewareHandler(req, path);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return middlewareHandler(req, path);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return middlewareHandler(req, path);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return middlewareHandler(req, path);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return middlewareHandler(req, path);
}
