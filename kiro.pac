// kiro.pac  —  Proxy Auto-Config for selective Singapore egress.
// -------------------------------------------------------------------
// Routes ONLY Kiro / AWS-auth traffic (including the browser sign-in
// flow) through the Singapore proxy. ALL other traffic — general web
// browsing, Windows Update, Office, etc. — egresses DIRECTLY from the
// local (Hong Kong) network.
//
// BEFORE USE: replace SG_PROXY_IP with your Singapore proxy's public
// (Elastic) IP, and the port if you changed it from 3128.

function FindProxyForURL(url, host) {
    var SG     = "13.214.161.250:8080";   // <-- EDIT IP (and port if changed)
    var DIRECT = "DIRECT";

    host = host.toLowerCase();


    // --- Kiro domains (all subdomains + apex) ---
    if (dnsDomainIs(host, ".kiro.dev") || host == "kiro.dev") return SG;

    // --- AWS endpoints that Kiro uses (inference + sign-in) ---
    if (shExpMatch(host, "checkip.amazonaws.com"))            return SG;
    if (shExpMatch(host, "q.*.amazonaws.com"))                return SG;
    if (shExpMatch(host, "cognito-identity.*.amazonaws.com")) return SG;
    if (shExpMatch(host, "oidc.*.amazonaws.com"))             return SG;
    if (shExpMatch(host, "portal.sso.*.amazonaws.com"))       return SG;
    if (shExpMatch(host, "*.sso.*.amazonaws.com"))            return SG;
    if (shExpMatch(host, "*.sso-portal.*.amazonaws.com"))     return SG;
    if (shExpMatch(host, "*.signin.aws"))                     return SG;
    if (shExpMatch(host, "*.signin.aws.amazon.com"))          return SG;
    if (shExpMatch(host, "*.awsapps.com"))                    return SG;

    // --- Everything else: direct (Hong Kong egress) ---
    return DIRECT;
}
