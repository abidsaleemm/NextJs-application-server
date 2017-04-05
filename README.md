# Multus Server Application

### Requirements:

- Node 7 & NPM
- Redux
- Express
- Websockets
- SQLite
- Azure SQL Server

## Azure Deployment

TODO

### Getting started

```bash
git clone git@bitbucket.org:interbizconsulting/application-server.git
cd application-server
npm install
npm run dev
```

### Building

TODO

```bash
npm run build
```

### SQL Queryies:

Create Table:

```sql
CREATE TABLE `projects` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`studyuid`	TEXT NOT NULL,
	`datetime`	TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`data`	BLOB
);
```
