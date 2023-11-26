export interface JwtToken {
    jti: string; // JWT ID (Guid)
    email: string;
    uid: string; // User ID (Guid)
    role: string[]; // Role (User, Admin, etc.)
    exp: number; // Expiration timestamp
    iss: string; // Issuer (e.g., "QafenAkullAPI")
    aud: string; // Audience (e.g., "QAClient")
}