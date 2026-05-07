/**
 * Contribution from dmeo
 * Generated: 2026-05-07T16:26:28.564Z
 */

export const NEW_QUERY = {
  "id": "q-1778171188564",
  "name": "demo",
  "description": "demo",
  "author": "dmeo",
  "github": "dmeo",
  "severity": "Medium",
  "type": "Detection",
  "tags": [],
  "tactics": [
    "TA0042"
  ],
  "techniques": [
    "T1583"
  ],
  "log_sources": [
    "demo"
  ],
  "query": "dataset = xdr_data\n| filter event_type = ENUM.PROCESS and (actor_process_command_line contains \"systemctl stop traps_pmd.service\" or actor_process_command_line contains \"disable traps_pmd.service\" or actor_process_command_line contains \"service traps_pmd stop\" or actor_process_command_line contains \"service traps_pmd disable\")"
};

// Add this to your QUERIES array in src/data.ts