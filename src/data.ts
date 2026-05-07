/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Query, Tactic, MitreTechnique } from './types';

export const TACTICS: Tactic[] = [
  {
    "id": "TA0043",
    "name": "Reconnaissance",
    "shortname": "Reconnaissance"
  },
  {
    "id": "TA0042",
    "name": "Resource Development",
    "shortname": "Resource Dev"
  },
  {
    "id": "TA0001",
    "name": "Initial Access",
    "shortname": "Initial Access"
  },
  {
    "id": "TA0002",
    "name": "Execution",
    "shortname": "Execution"
  },
  {
    "id": "TA0003",
    "name": "Persistence",
    "shortname": "Persistence"
  },
  {
    "id": "TA0004",
    "name": "Privilege Escalation",
    "shortname": "Priv Escalation"
  },
  {
    "id": "TA0005",
    "name": "Defense Evasion",
    "shortname": "Defense Evasion"
  },
  {
    "id": "TA0006",
    "name": "Credential Access",
    "shortname": "Cred Access"
  },
  {
    "id": "TA0007",
    "name": "Discovery",
    "shortname": "Discovery"
  },
  {
    "id": "TA0008",
    "name": "Lateral Movement",
    "shortname": "Lateral Move"
  },
  {
    "id": "TA0009",
    "name": "Collection",
    "shortname": "Collection"
  },
  {
    "id": "TA0011",
    "name": "Command and Control",
    "shortname": "C2"
  },
  {
    "id": "TA0010",
    "name": "Exfiltration",
    "shortname": "Exfiltration"
  },
  {
    "id": "TA0040",
    "name": "Impact",
    "shortname": "Impact"
  }
];

export const MITRE_MAPPINGS: Record<string, MitreTechnique> = {
  "T1036": {
    "name": "Masquerading",
    "description": "Adversaries may attempt to manipulate features of their artifacts to make them appear legitimate or benign to users and/or security tools.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.001": {
    "name": "Invalid Code Signature",
    "description": "Adversaries may attempt to mimic features of valid code signatures to make an executable appear benign to users and/or security tools.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.005": {
    "name": "Match Legitimate Resource Name or Location",
    "description": "Adversaries may place an executable in a common directory or use a name that is very similar to a legitimate system executable to avoid detection.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1553.002": {
    "name": "Code Signing",
    "description": "Adversaries may create, acquire, or steal code signing materials to sign their malware or tools.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1562.001": {
    "name": "Disable or Modify Tools",
    "description": "Adversaries may modify and/or disable security tools to avoid detection by security analysts.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1567.002": {
    "name": "Exfiltration to Cloud Storage",
    "description": "Adversaries may exfiltrate data to a cloud storage service like Dropbox, AWS S3, or Google Drive.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1052.001": {
    "name": "Exfiltration over USB",
    "description": "Adversaries may exfiltrate data over USB via mass storage devices or other physical connections.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1052": {
    "name": "Exfiltration Over Physical Medium",
    "description": "Adversaries may attempt to exfiltrate data by copying it to physical media, such as a USB drive or external hard drive.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1651": {
    "name": "Cloud Administration Command",
    "description": "Adversaries may use cloud administration tools or APIs to execute commands on remote systems within a cloud environment.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1053.005": {
    "name": "Scheduled Task",
    "description": "Adversaries may use the Task Scheduler to execute programs at system startup or on a scheduled basis for persistence.",
    "tactic_ids": [
      "TA0002",
      "TA0003",
      "TA0004"
    ]
  },
  "T1098.007": {
    "name": "Additional Local or Domain Groups",
    "description": "Adversaries may add an account to a privileged domain group to escalate privileges or maintain persistence.",
    "tactic_ids": [
      "TA0003",
      "TA0004"
    ]
  },
  "T1098": {
    "name": "Account Manipulation",
    "description": "Adversaries may manipulate accounts to maintain access to victim systems.",
    "tactic_ids": [
      "TA0003",
      "TA0004"
    ]
  },
  "T1078.002": {
    "name": "Domain Accounts",
    "description": "Adversaries may use valid domain credentials to access systems within a target network.",
    "tactic_ids": [
      "TA0005",
      "TA0003",
      "TA0004",
      "TA0001"
    ]
  },
  "T1078.003": {
    "name": "Local Accounts",
    "description": "Adversaries may abuse local accounts to gain access to or remain within a system.",
    "tactic_ids": [
      "TA0001",
      "TA0003",
      "TA0004",
      "TA0005"
    ]
  },
  "T1566": {
    "name": "Phishing",
    "description": "Adversaries may send phishing messages to gain access to victim systems.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1566.001": {
    "name": "Spearphishing Attachment",
    "description": "Adversaries may send spearphishing messages with a malicious attachment to gain access to victim systems.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1133": {
    "name": "External Remote Services",
    "description": "Adversaries may leverage external-facing remote services to gain access to internal-facing systems and networks.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1110": {
    "name": "Brute Force",
    "description": "Adversaries may use brute force techniques to gain access to accounts.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1190": {
    "name": "Exploit Public-Facing Application",
    "description": "Adversaries may attempt to exploit a weakness in an Internet-facing host or system to gain access.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1505.003": {
    "name": "Web Shell",
    "description": "Adversaries may backdoor web servers with web shells to establish persistent access.",
    "tactic_ids": [
      "TA0003"
    ]
  },
  "T1195": {
    "name": "Supply Chain Compromise",
    "description": "Adversaries may manipulate a supply chain to gain access to victim systems.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1195.002": {
    "name": "Compromise Software Dependencies",
    "description": "Adversaries may compromise software dependencies to gain access to victim systems.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1003": {
    "name": "OS Credential Dumping",
    "description": "Adversaries may dump credentials from the operating system to obtain account information.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.001": {
    "name": "LSASS Memory",
    "description": "Adversaries may attempt to access and dump credentials from the Local Security Authority Subsystem Service (LSASS) process memory.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.002": {
    "name": "Security Account Manager",
    "description": "Adversaries may attempt to extract account information from the Security Account Manager (SAM) database.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.003": {
    "name": "Active Directory Domain Database",
    "description": "Adversaries may attempt to extract account information from the Active Directory domain database (NTDS.dit).",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1558.003": {
    "name": "Kerberoasting",
    "description": "Adversaries may abuse a valid Kerberos ticket-granting service (TGS) ticket to potentially obtain account credentials.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1059.001": {
    "name": "PowerShell",
    "description": "Adversaries may use PowerShell to perform various actions during an intrusion, including credential theft.",
    "tactic_ids": [
      "TA0002",
      "TA0003"
    ]
  },
  "T1082": {
    "name": "System Information Discovery",
    "description": "Adversaries may attempt to get detailed information about the operating system and hardware, including version, patches, hotfixes, service packs, and architecture.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1046": {
    "name": "Network Service Discovery",
    "description": "Adversaries may attempt to get a listing of services running on remote hosts and local network infrastructure devices, including those that may be vulnerable to remote software exploitation.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1057": {
    "name": "Process Discovery",
    "description": "Adversaries may attempt to get information about running processes on a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1087.001": {
    "name": "Local Accounts",
    "description": "Adversaries may attempt to get a listing of local system accounts.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1087.002": {
    "name": "Domain Accounts",
    "description": "Adversaries may attempt to get a listing of domain accounts.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1018": {
    "name": "Remote System Discovery",
    "description": "Adversaries may attempt to get a listing of other systems by IP address, hostname, or other logical identifier on a network that may be used for lateral movement from the current system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1021.002": {
    "name": "SMB/Windows Admin Shares",
    "description": "Adversaries may use SMB administrative shares to move laterally across a network.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1047": {
    "name": "Windows Management Instrumentation",
    "description": "Adversaries may use Windows Management Instrumentation (WMI) to execute malicious commands and payloads.",
    "tactic_ids": [
      "TA0002",
      "TA0008"
    ]
  },
  "T1563.002": {
    "name": "RDP Hijacking",
    "description": "Adversaries may hijack an existing Remote Desktop Protocol (RDP) session to move laterally.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1021.006": {
    "name": "Windows Remote Management",
    "description": "Adversaries may use Windows Remote Management (WinRM) to move laterally across a network.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1550.002": {
    "name": "Pass the Hash",
    "description": "Adversaries may use stolen password hashes to move laterally across a network without needing cleartext passwords.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1114": {
    "name": "Email Collection",
    "description": "Adversaries may collect data from email systems to gather information about their target and internal communications.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1114.001": {
    "name": "Local Email Collections",
    "description": "Adversaries may collect data from local email clients and files, such as Outlook and PST/OST files.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1119": {
    "name": "Automated Collection",
    "description": "Adversaries may use scripts or other mechanisms to automatically collect large amounts of data from a target system.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1113": {
    "name": "Screen Capture",
    "description": "Adversaries may take screenshots or capture video of the user's desktop to gather information.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1115": {
    "name": "Clipboard Data",
    "description": "Adversaries may collect data from the system clipboard to steal sensitive information like passwords or codes.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1539": {
    "name": "Steal Web Session Cookie",
    "description": "Adversaries may steal session cookies from browsers to bypass multi-factor authentication (MFA) and gain access to web accounts.",
    "tactic_ids": [
      "TA0006",
      "TA0009"
    ]
  },
  "T1185": {
    "name": "Browser Session Hijacking",
    "description": "Adversaries may hijack a browser session to bypass MFA and gain access to web accounts and services.",
    "tactic_ids": [
      "TA0006",
      "TA0009"
    ]
  },
  "T1071": {
    "name": "Application Layer Protocol",
    "description": "Adversaries may use common application layer protocols for command and control (C2).",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1071.001": {
    "name": "Web Protocols",
    "description": "Adversaries may use web protocols like HTTP or HTTPS for command and control (C2).",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1071.004": {
    "name": "DNS",
    "description": "Adversaries may use the Domain Name System (DNS) for command and control (C2) and data exfiltration.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1571": {
    "name": "Non-Standard Port",
    "description": "Adversaries may use non-standard ports for command and control (C2) to avoid network filtering.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1219": {
    "name": "Remote Access Software",
    "description": "Adversaries may use legitimate remote access software for command and control (C2).",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1568": {
    "name": "Dynamic Resolution",
    "description": "Adversaries may use dynamic DNS or other methods to dynamically resolve their C2 infrastructure addresses.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1021.001": {
    "name": "Remote Desktop Protocol",
    "description": "Adversaries may use the Remote Desktop Protocol (RDP) to move laterally across a network.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1567": {
    "name": "Exfiltration Over Web Service",
    "description": "Adversaries may exfiltrate data to a cloud storage service or other web service.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1560": {
    "name": "Archive Collected Data",
    "description": "Adversaries may compress and/or encrypt data that is collected prior to exfiltration.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1560.001": {
    "name": "Archive via Utility",
    "description": "Adversaries may use standard utilities to compress and/or encrypt data prior to exfiltration.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1048": {
    "name": "Exfiltration Over Alternative Protocol",
    "description": "Adversaries may exfiltrate data using a protocol other than the main C2 channel.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1048.003": {
    "name": "Exfiltration Over ICMP",
    "description": "Adversaries may exfiltrate data using the Internet Control Message Protocol (ICMP).",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1486": {
    "name": "Data Encrypted for Impact",
    "description": "Adversaries may encrypt data on target systems to interrupt availability of system and network resources.",
    "tactic_ids": [
      "TA0040"
    ]
  },
  "T1490": {
    "name": "Inhibit System Recovery",
    "description": "Adversaries may delete or remove built-in data and settings that could be used to restore a system after an attack.",
    "tactic_ids": [
      "TA0040"
    ]
  },
  "T1489": {
    "name": "Service Stop",
    "description": "Adversaries may stop or disable services on a system to render them unavailable to users.",
    "tactic_ids": [
      "TA0040"
    ]
  },
  "T1595": {
    "name": "Active Scanning",
    "description": "Adversaries may execute active reconnaissance scans to gather information about victim networks, systems, services, and vulnerabilities.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1595.002": {
    "name": "Vulnerability Scanning",
    "description": "Adversaries may use vulnerability scanners to identify vulnerabilities in victim systems and services.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1590": {
    "name": "Gather Victim Network Information",
    "description": "Adversaries may gather information about the victim's network, such as IP addresses, subnets, and domain names.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1590.002": {
    "name": "DNS Information",
    "description": "Adversaries may gather information about a victim's DNS records, such as domain names and associated IP addresses.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1594": {
    "name": "Search Victim-Owned Websites",
    "description": "Adversaries may search victim-owned websites for information that can be used during targeting.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1593": {
    "name": "Search Open Technical Databases",
    "description": "Adversaries may search open technical databases to gather information about a victim that can be used during targeting.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1591": {
    "name": "Gather Victim Org Information",
    "description": "Adversaries may gather information about the victim organization, such as business operations, relationships, and structure.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1589": {
    "name": "Gather Victim Identity Information",
    "description": "Adversaries may gather information about the victim's identity, such as user accounts, credentials, and roles.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1589.002": {
    "name": "Email Addresses",
    "description": "Adversaries may gather email addresses associated with a victim that can be used during targeting.",
    "tactic_ids": [
      "TA0043"
    ]
  },
  "T1583": {
    "name": "Acquire Infrastructure",
    "description": "Adversaries may acquire infrastructure that can be used during targeting, including domains, IP addresses, and virtual systems.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1583.001": {
    "name": "Domains",
    "description": "Adversaries may acquire domains that can be used during targeting or for C2 infrastructure.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1583.003": {
    "name": "Virtual Private Servers",
    "description": "Adversaries may lease or otherwise acquire Virtual Private Servers (VPS) to host their tools or C2 servers.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1585": {
    "name": "Establish Accounts",
    "description": "Adversaries may create and manipulate accounts to maintain access to victim systems and infrastructure.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1585.001": {
    "name": "Social Media Accounts",
    "description": "Adversaries may create social media accounts to facilitate phishing or other social engineering attacks.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1588.003": {
    "name": "Malware",
    "description": "Adversaries may obtain malware to use during targeting and for persistence on victim systems.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1588.001": {
    "name": "Malware Development Tools",
    "description": "Adversaries may obtain tools used to develop or modify malware for their campaigns.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1588.004": {
    "name": "Digital Certificates",
    "description": "Adversaries may acquire or create digital certificates to sign malware or secure C2 communications.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1583.004": {
    "name": "Serverless",
    "description": "Adversaries may acquire serverless computing resources to host tools or execute malicious code.",
    "tactic_ids": [
      "TA0042"
    ]
  },
  "T1001": {
    "name": "Data Obfuscation",
    "description": "Adversaries may obfuscate data to make it difficult for security tools to inspect and identify.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1001.001": {
    "name": "Junk Data",
    "description": "Adversaries may add junk data to their communication flows to obfuscate the true nature of their activities.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1005": {
    "name": "Data from Local System",
    "description": "Adversaries may gather data from the local system to collect sensitive information.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1006": {
    "name": "Direct Volume Access",
    "description": "Adversaries may directly access the storage volume to bypass file system permissions and logging.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1007": {
    "name": "System Service Discovery",
    "description": "Adversaries may attempt to get information about the services running on a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1008": {
    "name": "Fallback Channels",
    "description": "Adversaries may use fallback channels to maintain C2 communication if primary channels are blocked.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1012": {
    "name": "Query Registry",
    "description": "Adversaries may query the Windows Registry to gather information about the system and installed software.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1014": {
    "name": "Rootkit",
    "description": "Adversaries may use rootkits to hide their presence and activities on a system.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1016": {
    "name": "System Network Configuration Discovery",
    "description": "Adversaries may attempt to gather information about the network configuration of a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1020": {
    "name": "Automated Exfiltration",
    "description": "Adversaries may use automated mechanisms to exfiltrate large amounts of data.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1027": {
    "name": "Obfuscated Files or Information",
    "description": "Adversaries may obfuscate files or information to evade detection.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1027.001": {
    "name": "Binary Padding",
    "description": "Adversaries may add binary padding to their files to change their signature and size.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1033": {
    "name": "System Owner/User Discovery",
    "description": "Adversaries may attempt to identify the owner or primary user of a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1034": {
    "name": "Path Interception",
    "description": "Adversaries may attempt to intercept a path to execute a malicious file instead of a legitimate one.",
    "tactic_ids": [
      "TA0003",
      "TA0004",
      "TA0005"
    ]
  },
  "T1037": {
    "name": "Boot or Logon Initialization Scripts",
    "description": "Adversaries may use boot or logon initialization scripts to maintain persistence.",
    "tactic_ids": [
      "TA0003",
      "TA0004"
    ]
  },
  "T1039": {
    "name": "Data from Network Shared Drive",
    "description": "Adversaries may gather data from network shared drives to collect sensitive information.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1040": {
    "name": "Network Sniffing",
    "description": "Adversaries may use network sniffing to capture traffic and gather information.",
    "tactic_ids": [
      "TA0006",
      "TA0007"
    ]
  },
  "T1041": {
    "name": "Exfiltration Over C2 Channel",
    "description": "Adversaries may exfiltrate data over their existing C2 channel.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1043": {
    "name": "Commonly Used Port",
    "description": "Adversaries may use commonly used ports to bypass network filtering and appear as legitimate traffic.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1049": {
    "name": "System Network Connections Discovery",
    "description": "Adversaries may attempt to gather information about the network connections of a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1001.002": {
    "name": "Steganography",
    "description": "Adversaries may use steganography to hide data within other data to evade detection.",
    "tactic_ids": [
      "TA0011",
      "TA0010"
    ]
  },
  "T1001.003": {
    "name": "Protocol or Service Impersonation",
    "description": "Adversaries may impersonate a legitimate protocol or service to obfuscate their activities.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1003.004": {
    "name": "LSA Secrets",
    "description": "Adversaries may attempt to extract LSA secrets from the registry to obtain account credentials.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.005": {
    "name": "Cached Domain Credentials",
    "description": "Adversaries may attempt to extract cached domain credentials to obtain account information.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.006": {
    "name": "DCSync",
    "description": "Adversaries may use DCSync to replicate domain controller data and extract account credentials.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.007": {
    "name": "Proc Filesystem",
    "description": "Adversaries may use the proc filesystem on Linux to extract account information.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1003.008": {
    "name": "/etc/passwd and /etc/shadow",
    "description": "Adversaries may attempt to access /etc/passwd and /etc/shadow to extract local account information.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1010": {
    "name": "Application Window Discovery",
    "description": "Adversaries may attempt to gather information about application windows to understand user activity.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1011": {
    "name": "Exfiltration Over Other Network Medium",
    "description": "Adversaries may exfiltrate data over a non-primary network medium to evade detection.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1011.001": {
    "name": "Exfiltration Over Bluetooth",
    "description": "Adversaries may exfiltrate data over Bluetooth to nearby devices.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1016.001": {
    "name": "Internet Connection Discovery",
    "description": "Adversaries may attempt to determine if a system has an active internet connection.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1016.002": {
    "name": "Wi-Fi Discovery",
    "description": "Adversaries may attempt to gather information about nearby Wi-Fi networks.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1020.001": {
    "name": "Traffic Duplication",
    "description": "Adversaries may duplicate network traffic to exfiltrate data without disrupting normal flow.",
    "tactic_ids": [
      "TA0010"
    ]
  },
  "T1021.003": {
    "name": "Distributed Component Object Model",
    "description": "Adversaries may use DCOM to move laterally and execute commands on remote systems.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1021.004": {
    "name": "SSH",
    "description": "Adversaries may use SSH to move laterally and execute commands on remote systems.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1021.005": {
    "name": "VNC",
    "description": "Adversaries may use VNC to gain remote access to systems for lateral movement.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1021.007": {
    "name": "Cloud Services",
    "description": "Adversaries may use cloud services to move laterally within a cloud environment.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1021.008": {
    "name": "Direct Cloud VM Connections",
    "description": "Adversaries may use direct connections to cloud VMs to move laterally.",
    "tactic_ids": [
      "TA0008"
    ]
  },
  "T1025": {
    "name": "Data from Removable Media",
    "description": "Adversaries may gather data from removable media for collection.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1026": {
    "name": "Multiband Communication",
    "description": "Adversaries may use multiple communication bands to evade detection and maintain C2.",
    "tactic_ids": [
      "TA0011"
    ]
  },
  "T1027.002": {
    "name": "Software Packing",
    "description": "Adversaries may use software packers to compress and obfuscate their payloads.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1027.003": {
    "name": "Steganography",
    "description": "Adversaries may use steganography to hide data within other files.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1027.004": {
    "name": "Compile After Delivery",
    "description": "Adversaries may deliver source code and compile it on the target system to evade detection.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1027.005": {
    "name": "Indicator Removal from Tools",
    "description": "Adversaries may remove strings or other indicators from their tools to evade detection.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1027.006": {
    "name": "HTML Smuggling",
    "description": "Adversaries may use HTML smuggling to deliver malicious payloads within a browser-rendered file.",
    "tactic_ids": [
      "TA0005",
      "TA0001"
    ]
  },
  "T1059.002": {
    "name": "AppleScript",
    "description": "Adversaries may use AppleScript to execute commands on macOS systems.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1059.003": {
    "name": "Windows Command Shell",
    "description": "Adversaries may use the Windows command shell to execute commands and scripts.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1059.004": {
    "name": "Unix Shell",
    "description": "Adversaries may use Unix shells to execute commands and scripts on Linux/macOS.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1059.005": {
    "name": "Visual Basic",
    "description": "Adversaries may use Visual Basic to execute commands and scripts.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1036.002": {
    "name": "Right-to-Left Override",
    "description": "Adversaries may use the right-to-left override character to masquerade the file extension.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.003": {
    "name": "Rename Legitimate Utilities",
    "description": "Adversaries may rename legitimate utilities to evade detection and masquerade as benign software.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.004": {
    "name": "Masquerade Task or Service",
    "description": "Adversaries may name a task or service to mimic a legitimate one.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.006": {
    "name": "Space after Filename",
    "description": "Adversaries may use a space after a filename to masquerade its type.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1036.007": {
    "name": "Double File Extension",
    "description": "Adversaries may use double file extensions to hide the true type of a file.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1059.006": {
    "name": "Python",
    "description": "Adversaries may use Python to execute commands and scripts.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1059.007": {
    "name": "JavaScript",
    "description": "Adversaries may use JavaScript to execute commands and scripts.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1069": {
    "name": "Permission Groups Discovery",
    "description": "Adversaries may attempt to discover permission groups to understand user privileges.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1070": {
    "name": "Indicator Removal",
    "description": "Adversaries may remove indicators of their activity to evade detection.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1071.002": {
    "name": "File Transfer Protocols",
    "description": "Adversaries may use file transfer protocols for C2 or exfiltration.",
    "tactic_ids": [
      "TA0011",
      "TA0010"
    ]
  },
  "T1071.003": {
    "name": "Mail Protocols",
    "description": "Adversaries may use mail protocols for C2 or exfiltration.",
    "tactic_ids": [
      "TA0011",
      "TA0010"
    ]
  },
  "T1600": {
    "name": "Weaken Encryption",
    "description": "Adversaries may attempt to weaken encryption to gain access to sensitive data.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1601": {
    "name": "Modify System Image",
    "description": "Adversaries may modify a system image to include malicious tools and maintain persistence.",
    "tactic_ids": [
      "TA0003"
    ]
  },
  "T1602": {
    "name": "Data from Configuration Repository",
    "description": "Adversaries may gather data from configuration repositories to collect information about the environment.",
    "tactic_ids": [
      "TA0009"
    ]
  },
  "T1606": {
    "name": "Forge Web Credentials",
    "description": "Adversaries may forge web credentials to gain unauthorized access to accounts.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1609": {
    "name": "Container Administration Command",
    "description": "Adversaries may use container administration commands to execute actions within a container environment.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1610": {
    "name": "Deploy Container",
    "description": "Adversaries may deploy a container to execute malicious code within an environment.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1611": {
    "name": "Escape to Host",
    "description": "Adversaries may attempt to escape from a container to the host system.",
    "tactic_ids": [
      "TA0004"
    ]
  },
  "T1614": {
    "name": "System Location Discovery",
    "description": "Adversaries may attempt to determine the physical location of a system.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1615": {
    "name": "Group Policy Discovery",
    "description": "Adversaries may attempt to gather information about Group Policy to understand the environment's security policies.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1619": {
    "name": "Cloud Storage Object Discovery",
    "description": "Adversaries may attempt to discover objects in cloud storage to identify sensitive data.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1620": {
    "name": "Reflective Code Loading",
    "description": "Adversaries may use reflective code loading to execute malicious code in memory without touching the disk.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1621": {
    "name": "Multi-Factor Authentication Request Generation",
    "description": "Adversaries may generate MFA requests to attempt to bypass authentication controls.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1622": {
    "name": "Debugger Evasion",
    "description": "Adversaries may attempt to evade debuggers to prevent analysis of their tools.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1647": {
    "name": "Plist File Modification",
    "description": "Adversaries may modify plist files on macOS to maintain persistence and execute malicious code.",
    "tactic_ids": [
      "TA0003"
    ]
  },
  "T1648": {
    "name": "Serverless Execution",
    "description": "Adversaries may use serverless computing to execute malicious code.",
    "tactic_ids": [
      "TA0002"
    ]
  },
  "T1649": {
    "name": "Steal or Forge Authentication Certificates",
    "description": "Adversaries may steal or forge authentication certificates to gain unauthorized access.",
    "tactic_ids": [
      "TA0006"
    ]
  },
  "T1652": {
    "name": "Device Driver Discovery",
    "description": "Adversaries may attempt to discover installed device drivers to identify potential vulnerabilities.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1654": {
    "name": "Log Enumeration",
    "description": "Adversaries may enumerate system logs to gather information and identify forensic tracks.",
    "tactic_ids": [
      "TA0007"
    ]
  },
  "T1656": {
    "name": "Impersonation",
    "description": "Adversaries may impersonate legitimate entities to facilitate social engineering and other attacks.",
    "tactic_ids": [
      "TA0001"
    ]
  },
  "T1657": {
    "name": "Financial Theft",
    "description": "Adversaries may engage in financial theft to obtain funds or other assets.",
    "tactic_ids": [
      "TA0040"
    ]
  },
  "T1665": {
    "name": "Hide Infrastructure",
    "description": "Adversaries may hide their infrastructure to evade detection and maintain operations.",
    "tactic_ids": [
      "TA0005"
    ]
  },
  "T1681": {
    "name": "Search Threat Vendor Data",
    "description": "Adversaries may search threat vendor data to identify potential targets and understand security landscapes.",
    "tactic_ids": [
      "TA0043"
    ]
  }
};

export const QUERIES: Query[] = [
  {
    "id": "teamviewer_execution.yaml",
    "name": "TeamViewer Execution",
    "description": "Identifies potentially malicious processes masquerading as legitimate TeamViewer software on non-Linux systems. It flags execution events where the binary claims to be signed by \"TeamViewer Germany GmbH\" but fails digital signature validation. This discrepancy indicates an adversary is likely using a spoofed or tampered executable to evade security controls.",
    "author": "Lukasz Kubik",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1036.001",
      "T1036.005",
      "T1553.002"
    ],
    "query": "Process action type = execution AND process execution signature = Invalid Signature AND process execution signer = TeamViewer Germany GmbH Host host os != linux",
    "tags": [
      "TeamViewer",
      "Remote Access"
    ],
    "bioc_category": "execution"
  },
  {
    "id": "disabling_traps_under_linux.yaml",
    "name": "Disabling Traps under Linux",
    "description": "This BIOC is designed to detect attempts to tamper with the endpoint security agent. Specifically, it identifies command-line executions that attempt to stop or disable the Traps (Palo Alto Networks Cortex XDR) service on a Linux operating system.",
    "author": "Lukasz Kubik",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1562.001"
    ],
    "query": "dataset = xdr_data\n| filter event_type = ENUM.PROCESS and (actor_process_command_line contains \"systemctl stop traps_pmd.service\" or actor_process_command_line contains \"disable traps_pmd.service\" or actor_process_command_line contains \"service traps_pmd stop\" or actor_process_command_line contains \"service traps_pmd disable\")",
    "tags": [
      "Tamper Protection",
      "Linux"
    ],
    "bioc_category": "tampering"
  },
  {
    "id": "file_upload_to_cloud_storage_providers.yaml",
    "name": "File Upload to Cloud Storage Providers",
    "description": "This XQL query detects network activity involving the upload of significant amounts of data (greater than 1 MB) to external domains associated with popular public cloud storage and file-sharing services.\nMonitoring large data transfers to these services is critical for identifying potential data exfiltration attempts, where an adversary or insider threat moves sensitive internal data to a personal or attacker-controlled external repository.",
    "author": "Leon Schulze",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent",
      "Network Logs"
    ],
    "mitre_ids": [
      "T1567.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname contains \"amazonaws.com\" or action_external_hostname contains \"s3.amazonaws.com\" or action_external_hostname contains \"blob.core.windows.net\" or action_external_hostname contains \"storage.googleapis.com\" or action_external_hostname contains \"dropbox.com\" or action_external_hostname contains \"dropboxapi.com\" or action_external_hostname contains \"box.com\" or action_external_hostname contains \"mega.nz\" or action_external_hostname contains \"mega.io\" or action_external_hostname contains \"onedrive.live.com\" or action_external_hostname contains \"sharepoint.com\" or action_external_hostname contains \"pcloud.com\" or action_external_hostname contains \"api.box.com\"\n| filter action_total_upload > 1000000",
    "tags": [
      "File Upload",
      "Exfiltration"
    ],
    "bioc_category": "exfiltration"
  },
  {
    "id": "file_written_to_external_device.yaml",
    "name": "File written to external device",
    "description": "Detects file activity (writing, opening, or creating files) specifically on removable media (like USB drives or external hard drives).",
    "author": "Lukasz Kubik",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1052.001",
      "T1052"
    ],
    "query": "dataset = xdr_data\n| filter event_type = ENUM.FILE and event_sub_type in (ENUM.FILE_WRITE, ENUM.FILE_OPEN, ENUM.FILE_CREATE_NEW)\n| alter device_type = json_extract(action_file_device_info, \"$.storage_device_drive_type\")\n| filter device_type = \"2\" // 2 = removable devices",
    "tags": [
      "USB Drive",
      "External Drive",
      "Data Exfiltration"
    ],
    "bioc_category": "exfiltration"
  },
  {
    "id": "new_ec2_instance_virtual_machine_was_created.yaml",
    "name": "New EC2 Instance (Virtual Machine) was created",
    "description": "Identifies the execution of the Amazon Web Services (AWS) Command Line Interface (CLI) used to provision new virtual machines. While valid for administrative tasks, this activity can be indicative of unauthorized infrastructure expansion, such as an adversary spinning up instances for cryptomining or persistence.",
    "author": "Martin Ohl",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1651"
    ],
    "query": "dataset = xdr_data\n| filter event_type = PROCESS\n| filter action_process_image_command_line ~= \"aws ec2 run-instances\"\n",
    "tags": [
      "AWS",
      "Persistence",
      "EC2"
    ],
    "bioc_category": "execution"
  },
  {
    "id": "scheduled_task_creation_and_modification_detection.yaml",
    "name": "Scheduled Task Creation and Modification Detection",
    "description": "Detects scheduled task creation or modification via schtasks.exe, PowerShell cmdlets, or COM objects. Adversaries use scheduled tasks for persistence and privilege escalation.",
    "author": "Leon Schulze",
    "content_type": "bioc",
    "severity": "Informational",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1053.005"
    ],
    "query": "dataset = xdr_data\n| filter event_type = PROCESS\n| filter (action_process_image_name = \"powershell.exe\" or action_process_image_name = \"schtasks.exe\" or action_process_image_name = \"pwsh.exe\" or action_process_image_name = \"taskeng.exe\")\n| filter action_process_image_command_line = \"*/create*\" or action_process_image_command_line = \"*Register-ScheduledTask*\" or action_process_image_command_line = \"*New-ScheduledTask*\" or action_process_image_command_line = \"*Set-ScheduledTask*\" or action_process_image_command_line = \"*Schedule.Service*\" or action_process_image_command_line = \"*RegisterTaskDefinition*\"",
    "tags": [
      "Scheduled Tasks"
    ],
    "bioc_category": "persistence"
  },
  {
    "id": "ad_privileged_groups_add.yaml",
    "name": "User added to high privileged AD group",
    "description": "Detection of a successful addition of a member to one of the highly privileged Active Directory security groups. This activity could signify an attempt to escalate privileges or compromise an account within the domain.",
    "author": "Leon Schulze",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Windows Event Logs"
    ],
    "mitre_ids": [
      "T1098.007",
      "T1098",
      "T1078.002"
    ],
    "query": "dataset = microsoft_windows_raw \n| filter event_id in (4728, 4732, 4756)\n| filter event_result = \"success\"\n| alter target_sid = json_extract_scalar(event_data, \"$.TargetSid\")\n| alter subject_username = json_extract_scalar(event_data, \"$.SubjectUserName\")\n| alter subject_logon_id = json_extract_scalar(event_data, \"$.SubjectLogonId\")\n| alter target_user_name = json_extract_scalar(event_data, \"$.TargetUserName\") \n| alter subject_user_sid = json_extract_scalar(event_data, \"$.SubjectUserSid\")\n| alter added_member_full_dn = json_extract_scalar(event_data, \"$.MemberName\") \n| alter added_member_sid = json_extract_scalar(event_data, \"$.MemberSid\")\n| alter target_domain_name = json_extract_scalar(event_data, \"$.TargetDomainName\")\n| alter subject_domain_name = json_extract_scalar(event_data, \"$.SubjectDomainName\")\n| alter privilege_list = json_extract_scalar(event_data, \"$.PrivilegeList\")\n| alter added_member = arrayindex(regextract(added_member_full_dn, \"CN=([^,]+)\"),0)\n| alter short_host = arrayindex(split(host_name, \".\"), 0)\n| filter target_user_name in (\n    \"Enterprise Admins\",\n    \"Domain Admins\",\n    \"Schema Admins\",\n    \"Administrators\",\n    \"DnsAdmins\",\n    \"DHCP Administrators\",\n    \"Backup Operators\",\n    \"Server Operators\"\n)",
    "tags": [
      "Active Directory",
      "Privilege Escalation",
      "Persistence",
      "Identity"
    ],
    "category": "Identity & Access",
    "created": "2025-01-10"
  },
  {
    "id": "active_scanning_activity.yaml",
    "name": "Active Scanning Activity Detection",
    "description": "Detects potential active scanning behavior by monitoring for a high volume of network connections to sensitive ports (SSH, RDP, SMB, etc.) from external sources. This is a characteristic sign of reconnaissance as adversaries attempt to identify open ports and vulnerable services.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs",
      "Firewall Logs"
    ],
    "mitre_ids": [
      "T1595.002",
      "T1595"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_port in (22, 23, 3389, 445, 80, 443)\n| stats count() as scan_count by action_external_hostname, action_external_port\n| filter scan_count > 50",
    "tags": [
      "Reconnaissance",
      "Scanning",
      "Network Security"
    ],
    "category": "Reconnaissance"
  },
  {
    "id": "network_intelligence_gathering.yaml",
    "name": "Network Intelligence Gathering",
    "description": "Identifies the use of common network diagnostic and lookup tools such as nslookup, dig, and whois. While often used for legitimate troubleshooting, frequent or targeted use can indicate an adversary gathering information about domain infrastructure, DNS records, and ownership details.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1590",
      "T1590.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter (action_process_image_command_line contains \"nslookup\" or action_process_image_command_line contains \"dig\" or action_process_image_command_line contains \"whois\")",
    "tags": [
      "Reconnaissance",
      "DNS",
      "Whois"
    ],
    "bioc_category": "reconnaissance"
  },
  {
    "id": "third_party_threat_intel_recon.yaml",
    "name": "OSINT via Third-Party Platforms",
    "description": "Detects network traffic to popular Open Source Intelligence (OSINT) and threat investigation platforms like Shodan, Censys, and VirusTotal. Adversaries often use these external services to perform reconnaissance on target infrastructure without directly interacting with the network.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Low",
    "log_sources": [
      "Network Logs"
    ],
    "mitre_ids": [
      "T1594",
      "T1593"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname contains \"shodan.io\" or action_external_hostname contains \"censys.io\" or action_external_hostname contains \"virustotal.com\" or action_external_hostname contains \"binaryedge.io\"",
    "tags": [
      "OSINT",
      "Reconnaissance",
      "Shodan"
    ],
    "category": "Reconnaissance"
  },
  {
    "id": "cloud_resource_reconnaissance.yaml",
    "name": "Cloud Infrastructure Discovery",
    "description": "Monitoring for CLI commands that list cloud resources, such as S3 buckets in AWS or storage accounts in Azure. Unexpected enumeration of cloud assets is a common early step in reconnaissance within cloud-native environments.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent",
      "Cloud Audit Logs"
    ],
    "mitre_ids": [
      "T1591",
      "TA0043"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"aws s3 ls\" or action_process_image_command_line contains \"az storage account list\" or action_process_image_command_line contains \"gcloud storage buckets list\"",
    "tags": [
      "Cloud",
      "AWS",
      "Azure",
      "Reconnaissance"
    ],
    "bioc_category": "reconnaissance"
  },
  {
    "id": "identity_enumeration_recon.yaml",
    "name": "Identity & User Enumeration",
    "description": "Detects attempts to enumerate user accounts and group memberships using native system tools like 'net user' or PowerShell AD modules. This reconnaissance activity helps attackers identify high-value targets and plan for credential access or lateral movement.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1589",
      "T1589.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"net user /domain\" or action_process_image_command_line contains \"Get-ADUser\" or action_process_image_command_line contains \"Get-NetUser\"",
    "tags": [
      "Reconnaissance",
      "Active Directory",
      "Identity"
    ],
    "bioc_category": "reconnaissance"
  },
  {
    "id": "dga_pattern_detection.yaml",
    "name": "DGA Domain Activity Detection",
    "description": "Detects network requests to domains that exhibit patterns characteristic of Domain Generation Algorithms (DGA). Adversaries use DGA to dynamically create infrastructure for Command and Control (C2), making it difficult to block via static blacklists. This is part of the Resource Development phase where they acquire and rotate infrastructure.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Network Logs",
      "DNS Logs"
    ],
    "mitre_ids": [
      "T1583.001",
      "T1583"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname ~= \"[a-z0-9]{12,}\\.(com|net|org|xyz|top)\" // Simple regex for long random-looking domains\n| stats count() as domain_hits by action_external_hostname\n| filter domain_hits > 10",
    "tags": [
      "DGA",
      "Resource Development",
      "Infrastructure"
    ],
    "category": "Resource Development"
  },
  {
    "id": "suspicious_vps_outbound.yaml",
    "name": "Outbound Communication to Bulletproof Hosting",
    "description": "Identifies outbound network traffic to known VPS and 'bulletproof' hosting providers frequently used by adversaries for staging and command-and-control. Monitoring these connections can reveal early-stage infrastructure development and testing.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs"
    ],
    "mitre_ids": [
      "T1583.003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname contains \"digitalocean\" or action_external_hostname contains \"linode\" or action_external_hostname contains \"vultr\" or action_external_hostname contains \"ovh\" or action_external_hostname contains \"hetzner\"\n| filter action_total_upload > 500000",
    "tags": [
      "VPS",
      "Resource Development",
      "C2 Staging"
    ],
    "category": "Resource Development"
  },
  {
    "id": "cloud_iam_user_burst.yaml",
    "name": "Bulk Cloud Account Creation",
    "description": "Detects a burst of IAM user or role creation in cloud environments (AWS, Azure, GCP). Adversaries may establish multiple accounts to provide redundancy and distributed access to infrastructure during the Resource Development phase.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cloud Audit Logs"
    ],
    "mitre_ids": [
      "T1585",
      "T1585.001"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"iam create-user\" or action_process_image_command_line contains \"az ad user create\" or action_process_image_command_line contains \"gcloud iam service-accounts create\"\n| stats count() as creation_burst by actor_process_image_name\n| filter creation_burst > 5",
    "tags": [
      "Cloud",
      "IAM",
      "Resource Development",
      "Accounts"
    ],
    "bioc_category": "resource_development"
  },
  {
    "id": "obtaining_capabilities_malware_repo.yaml",
    "name": "Tool Acquisition from Public Repositories",
    "description": "Monitoring for the download of known offensive security tools and exploitation frameworks from public code repositories like GitHub or GitLab. This activity indicates an adversary obtaining capabilities to use in subsequent phases of an attack.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent",
      "Network Logs"
    ],
    "mitre_ids": [
      "T1588.003",
      "T1588.001"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"git clone\" or action_process_image_command_line contains \"wget\" or action_process_image_command_line contains \"curl\"\n| filter action_process_image_command_line contains \"mimikatz\" or action_process_image_command_line contains \"cobaltstrike\" or action_process_image_command_line contains \"bloodhound\" or action_process_image_command_line contains \"pypykatz\"",
    "tags": [
      "Tool Acquisition",
      "Resource Development",
      "Github"
    ],
    "bioc_category": "resource_development"
  },
  {
    "id": "digital_certificate_acquisition.yaml",
    "name": "Automated Certificate Acquisition",
    "description": "Detects the use of automated tools (like Certbot) to acquire SSL/TLS certificates on non-standard systems. Adversaries often acquire legitimate certificates to make their staging and C2 infrastructure appear trustworthy and evade SSL/TLS inspection.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1588.004",
      "T1583.004"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"certbot\" or action_process_image_command_line contains \"letsencrypt\" or action_process_image_command_line contains \"acme.sh\"",
    "tags": [
      "Resource Development",
      "Certificates",
      "Infrastructure"
    ],
    "bioc_category": "resource_development"
  },
  {
    "id": "phishing_attachment_execution.yaml",
    "name": "Phishing Attachment Child Process",
    "description": "Detects productivity applications (Excel, Word, Outlook) spawning suspicious child processes like cmd.exe or powershell.exe. This is a classic indicator of a user opening a malicious phishing attachment with embedded macros or scripts.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1566.001",
      "T1566"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter actor_process_image_name in (\"excel.exe\", \"winword.exe\", \"powerpnt.exe\", \"outlook.exe\") \n| filter action_process_image_name in (\"cmd.exe\", \"powershell.exe\", \"wscript.exe\", \"cscript.exe\", \"mshta.exe\")",
    "tags": [
      "Initial Access",
      "Phishing",
      "Macros"
    ],
    "bioc_category": "initial_access"
  },
  {
    "id": "external_service_brute_force_success.yaml",
    "name": "Successful Brute Force on Remote Services",
    "description": "Identifies a pattern of multiple failed authentication attempts followed by a successful login from the same external IP address. This suggests a successful brute-force or password-spraying attack against external-facing services like VPN or RDP.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Critical",
    "log_sources": [
      "Authentication Logs",
      "VPN Logs"
    ],
    "mitre_ids": [
      "T1133",
      "T1110"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.AUTH \n| stats count(result = \"FAILURE\") as fail_count, count(result = \"SUCCESS\") as success_count by action_remote_ip, auth_method\n| filter fail_count > 25 and success_count > 0",
    "tags": [
      "Initial Access",
      "Brute Force",
      "External Services"
    ],
    "category": "Initial Access"
  },
  {
    "id": "web_server_webshell_spawn.yaml",
    "name": "Web Server Shell Execution (Webshell)",
    "description": "Detects a web server process (IIS, Apache, Nginx) spawning a command shell or interpreter. This is highly indicative of a successful exploitation of a public-facing application resulting in the deployment and use of a webshell.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1190",
      "T1505.003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter actor_process_image_name in (\"w3wp.exe\", \"httpd\", \"apache2\", \"nginx\") \n| filter action_process_image_name in (\"cmd.exe\", \"powershell.exe\", \"sh\", \"bash\", \"php\", \"python\", \"perl\")",
    "tags": [
      "Initial Access",
      "Exploitation",
      "Webshell"
    ],
    "bioc_category": "initial_access"
  },
  {
    "id": "suspicious_vps_login.yaml",
    "name": "Successful Login from Unusual Geo-Location",
    "description": "Detects successful administrative logins originating from geographic locations or ISP ranges that are not baseline for the organization. This type of anomaly often indicates the use of stolen 'Valid Accounts' by an external adversary.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Authentication Logs"
    ],
    "mitre_ids": [
      "T1078",
      "T1078.003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.AUTH \n| filter result = \"SUCCESS\" \n| filter action_country_code not in (\"US\", \"GB\", \"CA\", \"AU\") // Replace with your corporate allow-list\n| filter action_remote_ip_is_isp = true",
    "tags": [
      "Initial Access",
      "Valid Accounts",
      "Anomalous Login"
    ],
    "category": "Initial Access"
  },
  {
    "id": "supply_chain_dependency_poisoning.yaml",
    "name": "Suspicious Dependency Repository Access",
    "description": "Monitors package managers (npm, pip, maven) accessing non-standard or suspicious external domains. This helps identify potential supply chain attacks where a developer might be tricked into downloading a 'poisoned' dependency from a typosquatted registry.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs"
    ],
    "mitre_ids": [
      "T1195.002",
      "T1195"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_process_image_name in (\"npm\", \"pip\", \"mvn\", \"npm-cli.js\")\n| filter action_external_hostname not in (\"registry.npmjs.org\", \"pypi.org\", \"repo.maven.apache.org\", \"files.pythonhosted.org\")\n| filter action_external_hostname !~= \".*\\.local|.*\\.internal\"",
    "tags": [
      "Initial Access",
      "Supply Chain",
      "Dependency Transition"
    ],
    "category": "Initial Access"
  },
  {
    "id": "lsass_memory_dumping.yaml",
    "name": "LSASS Memory Dumping Detection",
    "description": "Detects processes attempting to read or dump the memory of the Local Security Authority Subsystem Service (LSASS). This is a primary technique used by adversaries to extract plaintext passwords, NTLM hashes, and Kerberos tickets from system memory using tools like Mimikatz or Procdump.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1003.001",
      "T1003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS_ACCESS \n| filter target_process_image_name = \"lsass.exe\" \n| filter action_process_access_requested_access in (0x1fffff, 0x1410, 0x1010, 0x143a)",
    "tags": [
      "Credential Access",
      "LSASS",
      "Mimikatz"
    ],
    "bioc_category": "credential_access"
  },
  {
    "id": "sam_hive_registry_access.yaml",
    "name": "SAM Hive Registry Export",
    "description": "Identifies attempts to export the Security Account Manager (SAM) registry hive using native tools like 'reg.exe'. Exposing the SAM hive allows attackers to take it offline and perform brute-force attacks to crack local account password hashes.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1003.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"reg\" and action_process_image_command_line contains \"save\" and (action_process_image_command_line contains \"hklm\\sam\" or action_process_image_command_line contains \"hklm\\system\")",
    "tags": [
      "Credential Access",
      "SAM",
      "Registry"
    ],
    "bioc_category": "credential_access"
  },
  {
    "id": "kerberoasting_activity.yaml",
    "name": "Potential Kerberoasting Activity",
    "description": "Detects patterns consistent with Kerberoasting, where an adversary requests many Kerberos service tickets for accounts with Service Principal Names (SPNs). The offline cracking of these tickets can reveal cleartext service account passwords.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Active Directory Logs"
    ],
    "mitre_ids": [
      "T1558.003"
    ],
    "query": "dataset = identity_data \n| filter event_type = ENUM.KERBEROS_AUTH \n| filter auth_status = \"SUCCESS\" \n| stats count() as ticket_request_count by actor_user_name, action_service_name \n| filter ticket_request_count > 50",
    "tags": [
      "Credential Access",
      "Kerberoasting",
      "Active Directory"
    ],
    "category": "Credential Access"
  },
  {
    "id": "ntds_dit_exfiltration_attempt.yaml",
    "name": "NTDS.dit File Access (AD Database)",
    "description": "Detects access or attempts to copy the NTDS.dit file, which is the database file for Microsoft Active Directory. Compromising this file allows attackers to extract all domain hashes and is often a precursor to complete domain takeover.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent",
      "File Logs"
    ],
    "mitre_ids": [
      "T1003.003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.FILE \n| filter action_file_path contains \"ntds.dit\" and action_file_name != \"lsass.exe\"",
    "tags": [
      "Credential Access",
      "Active Directory",
      "NTDS"
    ],
    "bioc_category": "credential_access"
  },
  {
    "id": "powershell_credential_dumping_scripts.yaml",
    "name": "PowerShell Credential Dumping Scripts",
    "description": "Identifies the execution of known PowerShell scripts and modules used for credential theft, such as Invoke-Mimikatz or Out-Minidump. Monitoring for these script block signatures can detect highly effective and often obfuscated credential access attempts.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent",
      "PowerShell Logs"
    ],
    "mitre_ids": [
      "T1059.001",
      "T1003"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.POWERSHELL \n| filter script_content contains \"Invoke-Mimikatz\" or script_content contains \"MiniDumpWriteDump\" or script_content contains \"ReadProcessMemory\"",
    "tags": [
      "Credential Access",
      "PowerShell",
      "Scripts"
    ],
    "bioc_category": "credential_access"
  },
  {
    "id": "system_information_discovery.yaml",
    "name": "System Information Discovery",
    "description": "Detects the execution of tools used to gather basic system information, such as 'systeminfo' or 'hostname'. Adversaries use these commands to understand the environment they have landed in, including OS version, hardware specs, and patch levels.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1082"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name in (\"systeminfo.exe\", \"hostname.exe\", \"whoami.exe\", \"uname\")",
    "tags": [
      "Discovery",
      "System Info"
    ],
    "bioc_category": "discovery"
  },
  {
    "id": "internal_network_scanning.yaml",
    "name": "Internal Network Service Discovery",
    "description": "Identifies potential internal network scanning by monitoring a single process making connections to a large number of unique internal IP addresses or ports. This is a key step as attackers look for vulnerable internal services or lateral movement targets.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs"
    ],
    "mitre_ids": [
      "T1046"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_remote_ip_is_internal = true \n| stats count_distinct(action_remote_port) as port_count by actor_process_image_name, agent_hostname \n| filter port_count > 20",
    "tags": [
      "Discovery",
      "Network Scanning",
      "Internal"
    ],
    "category": "Discovery"
  },
  {
    "id": "process_discovery_enumeration.yaml",
    "name": "Active Process Enumeration",
    "description": "Detects native commands used to list running processes, such as 'tasklist' on Windows or 'ps' on Linux. Attackers perform process discovery to identify security software, find high-value targets (like browsers or admin tools), and plan for process injection.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1057"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name in (\"tasklist.exe\", \"ps\", \"top\", \"htop\")",
    "tags": [
      "Discovery",
      "Process Discovery"
    ],
    "bioc_category": "discovery"
  },
  {
    "id": "local_group_discovery.yaml",
    "name": "Local and Domain Group Discovery",
    "description": "Identifies the use of commands like 'net group' or 'net localgroup' to enumerate users and their privileges. Understanding group memberships, especially for administrative groups, is critical for attackers planning privilege escalation.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1087.001",
      "T1087.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"net localgroup\" or action_process_image_command_line contains \"net group\" or action_process_image_command_line contains \"get-localgroup\"",
    "tags": [
      "Discovery",
      "Identity",
      "Groups"
    ],
    "bioc_category": "discovery"
  },
  {
    "id": "remote_system_discovery_arp.yaml",
    "name": "Remote System Discovery (ARP/Net View)",
    "description": "Detects the use of the ARP table or 'net view' to discover other systems on the local network segment. This helps attackers map the neighbor network and identify potential targets for lateral movement without active scanning.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1018"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"arp -a\" or action_process_image_command_line contains \"net view\" or action_process_image_command_line contains \"test-connection\"",
    "tags": [
      "Discovery",
      "Network Discovery",
      "ARP"
    ],
    "bioc_category": "discovery"
  },
  {
    "id": "smb_lateral_movement_execution.yaml",
    "name": "Lateral Movement via SMB Admin Shares",
    "description": "Detects the creation of files or execution of processes via administrative shares (C$, ADMIN$). Adversaries frequently use these shares to move laterally across a network after obtaining administrative credentials.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent",
      "File Logs"
    ],
    "mitre_ids": [
      "T1021.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.FILE \n| filter action_file_path contains \"\\\\C$\\\\Windows\" or action_file_path contains \"\\\\ADMIN$\\\\System32\" \n| filter action_file_name in (\"psexec.exe\", \"paexec.exe\", \"remcom.exe\")",
    "tags": [
      "Lateral Movement",
      "SMB",
      "Admin Shares"
    ],
    "bioc_category": "lateral_movement"
  },
  {
    "id": "wmi_remote_execution.yaml",
    "name": "Remote Execution via WMI",
    "description": "Identifies the use of Windows Management Instrumentation (WMI) to execute processes on remote systems. This is a common technique for stealthy lateral movement that avoids many traditional file-based detection mechanisms.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1047"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"wmic\" and action_process_image_command_line contains \"/node:\" and action_process_image_command_line contains \"process call create\"",
    "tags": [
      "Lateral Movement",
      "WMI",
      "Remote Exec"
    ],
    "bioc_category": "lateral_movement"
  },
  {
    "id": "rdp_hijacking_tscon.yaml",
    "name": "RDP Session Hijacking (tscon)",
    "description": "Detects the use of the 'tscon' utility to hijack an existing Remote Desktop session. Attackers use this to gain access to a logged-in user's desktop environment without needing their password, provided they have SYSTEM privileges.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1563.002"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name = \"tscon.exe\" \n| filter action_process_image_command_line contains \"/dest:rdp-tcp#\"",
    "tags": [
      "Lateral Movement",
      "RDP",
      "Session Hijacking"
    ],
    "bioc_category": "lateral_movement"
  },
  {
    "id": "winrm_remote_management_use.yaml",
    "name": "WinRM Remote Management Usage",
    "description": "Monitors for the use of Windows Remote Management (WinRM) or PowerShell Remoting from unusual source processes. While often legitimate for admins, it is an increasingly popular channel for lateral movement and remote command execution.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs",
      "Firewall Logs"
    ],
    "mitre_ids": [
      "T1021.006"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_remote_port in (5985, 5986) \n| filter actor_process_image_name not in (\"powershell.exe\", \"powershell_ise.exe\", \"wsmprovhost.exe\")",
    "tags": [
      "Lateral Movement",
      "WinRM",
      "PowerShell"
    ],
    "category": "Lateral Movement"
  },
  {
    "id": "pass_the_hash_auth_anomaly.yaml",
    "name": "Pass-The-Hash Authentication Pattern",
    "description": "Detects authentication patterns consistent with Pass-The-Hash (PtH) attacks, such as logins using NTLM with a source process that is not typically involved in authentication, or logins to multiple workstations in a short timeframe.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Active Directory Logs",
      "XDR Identity"
    ],
    "mitre_ids": [
      "T1550.002"
    ],
    "query": "dataset = identity_data \n| filter auth_method = \"NTLM\" \n| stats count_distinct(agent_hostname) as target_host_count by actor_user_name \n| filter target_host_count > 10",
    "tags": [
      "Lateral Movement",
      "Pass-the-Hash",
      "NTLM"
    ],
    "category": "Lateral Movement"
  },
  {
    "id": "email_collection_outlook.yaml",
    "name": "Email Collection from Outlook",
    "description": "Detects processes attempting to read or export data from the Outlook email client. Adversaries may collect emails to gather sensitive information, internal communications, or credentials.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1114.001",
      "T1114"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.FILE \n| filter action_file_path contains \"AppData\\Local\\Microsoft\\Outlook\" and action_file_extension = \"ost\" \n| filter actor_process_image_name not in (\"outlook.exe\", \"searchindexer.exe\")",
    "tags": [
      "Collection",
      "Email",
      "Outlook"
    ],
    "bioc_category": "collection"
  },
  {
    "id": "automated_collection_scripts.yaml",
    "name": "Automated Data Collection Activity",
    "description": "Identifies the use of scripts or commands to automatically gather and stage files, often using wildcards or recursive copy operations to collect documents, configuration files, or database backups.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1119"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"copy \" or action_process_image_command_line contains \"xcopy \" or action_process_image_command_line contains \"robocopy \" \n| filter (action_process_image_command_line contains \"*.doc*\" or action_process_image_command_line contains \"*.pdf\" or action_process_image_command_line contains \"*.xlsx\" or action_process_image_command_line contains \"*.txt\")",
    "tags": [
      "Collection",
      "Automated Collection"
    ],
    "bioc_category": "collection"
  },
  {
    "id": "screenshot_capture_activity.yaml",
    "name": "Screen Capture Activity",
    "description": "Detects the execution of tools or system APIs used to take screenshots of the user's desktop. This can be used by an adversary to collect sensitive visual information or passwords displayed on the screen.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Low",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1113"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name in (\"screencapture\", \"snippingtool.exe\", \"psr.exe\") or action_process_image_command_line contains \"gdi32.dll,PrintWindow\"",
    "tags": [
      "Collection",
      "Screen Capture"
    ],
    "bioc_category": "collection"
  },
  {
    "id": "clipboard_data_collection.yaml",
    "name": "Clipboard Data Collection",
    "description": "Identifies processes attempting to access or monitor the system clipboard. Adversaries may use this to steal copied passwords, two-factor authentication codes, or sensitive snippets of data.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1115"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"Get-Clipboard\" or action_process_image_command_line contains \"clip.exe\" or action_process_image_command_line contains \"powershell -command *Get-Clipboard*\"",
    "tags": [
      "Collection",
      "Clipboard"
    ],
    "bioc_category": "collection"
  },
  {
    "id": "browser_data_theft_tools.yaml",
    "name": "Browser Data Theft Attempt",
    "description": "Detects access to sensitive browser files such as cookies, login data, or history by non-browser processes. This is a common method for stealing web-based session tokens and saved credentials.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1539",
      "T1185"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.FILE \n| filter (action_file_path contains \"Google\\Chrome\\User Data\\Default\\Login Data\" or action_file_path contains \"Google\\Chrome\\User Data\\Default\\Cookies\") \n| filter actor_process_image_name not in (\"chrome.exe\", \"msedge.exe\", \"firefox.exe\")",
    "tags": [
      "Collection",
      "Browser",
      "Credentials"
    ],
    "bioc_category": "collection"
  },
  {
    "id": "dns_c2_tunneling_detection.yaml",
    "name": "DNS Tunneling for C2 Detection",
    "description": "Identifies potential DNS tunneling behavior, often used for stealthy Command and Control (C2) communication. High volume of unique subdomains or large DNS response payloads are key indicators.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Critical",
    "log_sources": [
      "DNS Logs",
      "Network Logs"
    ],
    "mitre_ids": [
      "T1071.004"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_remote_port = 53 \n| stats count_distinct(action_external_hostname) as unique_subdomains by agent_hostname, bin(_time, 1h) \n| filter unique_subdomains > 500",
    "tags": [
      "C2",
      "DNS Tunneling",
      "Exfiltration"
    ],
    "category": "Command and Control"
  },
  {
    "id": "suspicious_user_agent_c2.yaml",
    "name": "Suspicious User-Agent in Outbound Traffic",
    "description": "Detects outbound HTTP/HTTPS requests that use rare, non-standard, or suspicious User-Agent strings. Adversaries often customize User-Agents to mimic specific browsers or hide their C2 traffic in plain sight.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Network Logs",
      "Proxy Logs"
    ],
    "mitre_ids": [
      "T1071.001",
      "T1071"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_http_user_agent != null \n| filter action_http_user_agent in (\"curl/7.29.0\", \"Wget/1.14 (linux-gnu)\", \"PowerShell/5.1\", \"bitsadmin\") \n| filter action_external_hostname !~= \".*\\.microsoft.com|.*\\.windowsupdate.com\"",
    "tags": [
      "C2",
      "User-Agent",
      "HTTP"
    ],
    "category": "Command and Control"
  },
  {
    "id": "non_standard_port_outbound.yaml",
    "name": "Outbound Communication over Non-Standard Ports",
    "description": "Identifies outbound network connections to external IP addresses using ports that are not typically used for web traffic (e.g., ports other than 80, 443, 8080). This can indicate direct C2 beaconing over raw TCP/UDP channels.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "Medium",
    "log_sources": [
      "Network Logs",
      "Firewall Logs"
    ],
    "mitre_ids": [
      "T1571"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_remote_port not in (80, 443, 22, 53, 123, 8080, 8443) \n| filter action_remote_ip_is_internal = false \n| stats count() as port_usage by action_remote_port, agent_hostname \n| filter port_usage > 5",
    "tags": [
      "C2",
      "Network",
      "Anomaly"
    ],
    "category": "Command and Control"
  },
  {
    "id": "remotely_monitored_software_rdp.yaml",
    "name": "Remote Access Software used for C2",
    "description": "Detects the use of legitimate remote access tools like TeamViewer, AnyDesk, or ScreenConnect in environments where they are not expected. Adversaries use these to establish interactive C2 channels that are harder to distinguish from normal admin activity.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1219",
      "T1021.001"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name in (\"teamviewer.exe\", \"anydesk.exe\", \"screenconnect.exe\", \"logmein.exe\", \"ammyy.exe\") \n| filter agent_hostname contains \"SRV\" or agent_hostname contains \"DC\"",
    "tags": [
      "C2",
      "Remote Access",
      "Admins"
    ],
    "bioc_category": "command_and_control"
  },
  {
    "id": "dynamic_dns_beaconing.yaml",
    "name": "C2 Beaconing via Dynamic DNS",
    "description": "Identifies recurring outbound network connections to domains hosted on Dynamic DNS (DDNS) providers. DDNS is frequently used by attackers to maintain a stable C2 address while frequently changing the underlying IP infrastructure.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Network Logs",
      "DNS Logs"
    ],
    "mitre_ids": [
      "T1071",
      "T1568"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname contains \"duckdns.org\" or action_external_hostname contains \"no-ip.com\" or action_external_hostname contains \"dyndns.org\" or action_external_hostname contains \"hopto.org\" \n| stats count() as beacon_count by action_external_hostname, agent_hostname, bin(_time, 5m) \n| filter beacon_count > 10",
    "tags": [
      "C2",
      "Dynamic DNS",
      "Beaconing"
    ],
    "category": "Command and Control"
  },
  {
    "id": "exfiltration_over_alternative_service.yaml",
    "name": "Exfiltration to Cloud Storage (Dropbox/Mega)",
    "description": "Detects large outbound data transfers to popular cloud storage and file-sharing services. Adversaries often use these legitimate platforms to exfiltrate stolen data, as they are less likely to be blocked by standard egress filters.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Network Logs",
      "Proxy Logs"
    ],
    "mitre_ids": [
      "T1567.002",
      "T1567"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter action_external_hostname contains \"dropbox.com\" or action_external_hostname contains \"mega.nz\" or action_external_hostname contains \"pcloud.com\" \n| stats sum(action_total_upload) as total_upload_bytes by agent_hostname, bin(_time, 1h) \n| filter total_upload_bytes > 100000000 // > 100MB",
    "tags": [
      "Exfiltration",
      "Cloud Storage",
      "Data Loss"
    ],
    "category": "Exfiltration"
  },
  {
    "id": "archive_via_utility_for_exfil.yaml",
    "name": "Data Archiving for Exfiltration",
    "description": "Identifies the use of compression utilities like 7-Zip, WinRAR, or tar to create archives of sensitive file types in staging directories. Archiving is a common precursor to exfiltration to reduce transfer time and bundle stolen data.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Medium",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1560.001",
      "T1560"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_name in (\"7z.exe\", \"rar.exe\", \"tar.exe\", \"zip.exe\") \n| filter action_process_image_command_line contains \" a \" and (action_process_image_command_line contains \".zip\" or action_process_image_command_line contains \".rar\" or action_process_image_command_line contains \".7z\")",
    "tags": [
      "Exfiltration",
      "Archiving",
      "Staging"
    ],
    "bioc_category": "exfiltration"
  },
  {
    "id": "exfiltration_over_icmp.yaml",
    "name": "Exfiltration Over ICMP Tunnel",
    "description": "Detects potential data exfiltration using ICMP (Ping) packets. Unusually large ICMP payloads or high frequencies of ICMP traffic to a single external host can indicate a covert tunneling channel.",
    "author": "AI Assistant",
    "content_type": "correlation",
    "severity": "High",
    "log_sources": [
      "Network Logs"
    ],
    "mitre_ids": [
      "T1048.003",
      "T1048"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.NETWORK \n| filter network_protocol = \"ICMP\" \n| stats count() as icmp_count, avg(action_total_payload_size) as avg_payload by action_external_hostname, agent_hostname \n| filter icmp_count > 1000 or avg_payload > 1000",
    "tags": [
      "Exfiltration",
      "ICMP",
      "Tunneling"
    ],
    "category": "Exfiltration"
  },
  {
    "id": "ransomware_file_encryption.yaml",
    "name": "Ransomware File Encryption Pattern",
    "description": "Detects rapid file modification and renaming activity consistent with ransomware encrypting user data. Monitoring for a high volume of file 'rename' or 'write' events with unusual extensions is a critical defensive measure.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent",
      "File Logs"
    ],
    "mitre_ids": [
      "T1486"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.FILE \n| filter action_file_operation in (ENUM.FILE_WRITE, ENUM.FILE_RENAME) \n| filter action_file_extension in (\"locked\", \"encrypted\", \"crypted\", \"crypt\", \"onion\") \n| stats count() as file_hit_count by agent_hostname, actor_process_image_name, bin(_time, 1m) \n| filter file_hit_count > 50",
    "tags": [
      "Impact",
      "Ransomware",
      "Encryption"
    ],
    "bioc_category": "impact"
  },
  {
    "id": "shadow_copy_deletion.yaml",
    "name": "Volume Shadow Copy Deletion (Inhibit Recovery)",
    "description": "Identifies attempts to delete Windows Volume Shadow Copies using 'vssadmin' or 'wmic'. Adversaries perform this to prevent users from recovering their files after a ransomware attack.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "Critical",
    "log_sources": [
      "Cortex XDR Agent"
    ],
    "mitre_ids": [
      "T1490"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter (action_process_image_command_line contains \"vssadmin\" and action_process_image_command_line contains \"delete shadows\") or (action_process_image_command_line contains \"shadowcopy\" and action_process_image_command_line contains \"delete\")",
    "tags": [
      "Impact",
      "Ransomware",
      "Recovery"
    ],
    "bioc_category": "impact"
  },
  {
    "id": "service_stop_impact.yaml",
    "name": "Critical Security Service Stop",
    "description": "Detects attempts to stop or disable critical security services, such as Windows Defender, Firewalls, or XDR agents. Disabling security controls is a common step during the Impact phase to ensure malicious actions go undetected.",
    "author": "AI Assistant",
    "content_type": "bioc",
    "severity": "High",
    "log_sources": [
      "Cortex XDR Agent",
      "System Logs"
    ],
    "mitre_ids": [
      "T1489"
    ],
    "query": "dataset = xdr_data \n| filter event_type = ENUM.PROCESS \n| filter action_process_image_command_line contains \"net stop\" or action_process_image_command_line contains \"sc stop\" or action_process_image_command_line contains \"Set-Service -Status Stopped\" \n| filter action_process_image_command_line contains \"WinDefend\" or action_process_image_command_line contains \"MpsSvc\" or action_process_image_command_line contains \"tpservice\"",
    "tags": [
      "Impact",
      "Inhibition",
      "Security Controls"
    ],
    "bioc_category": "impact"
  }
];
