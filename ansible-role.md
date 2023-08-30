# ansible role:
```
* roles--> task--> main.yml keeps all the executable task
* hsot_vars/group_vars keeps the variable and can be used while executing the task on the host with same name.
* ./uat-coupon-admin.yaml in the ansible root directory, define hostname and assign role, which role to execute for this host.
* handlers--> main.yml keeps some task which can execute while its being called, usually start, stop, restart services.
* template--> can be used to purge jinja template. create a configuration file based on the environment/variable etc. 
* files--> can be used to copy static/fixed file from local to remote.
* defaults-->main.yml can be used to declare default variable , which are common/fixed for all the environment (uat/prod or different module).
```

## tree of a example role
```  
.
├── host_vars
│   ├── uat-coupon-admin
│   ├── uat-coupon-cimtapi
│   ├── uat-coupon-cpsapi
│   └── uat-coupon-redeem

├── roles
│   ├── cloudwatch
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   ├── awscli.conf.j2
│   │   │   └── awslogs.conf.j2
│   │   └── vars
│   │       └── main.yml
│   ├── sysdig
│   │   ├── README.md
│   │   ├── defaults
│   │   │   └── main.yml
│   │   ├── files
│   │   │   └── sysdig-draios.repo
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── meta
│   │   │   └── main.yml
│   │   ├── tasks
│   │   │   ├── install-sysdig-agent.yml
│   │   │   ├── install-sysdig-host-scanner.yml
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   └── sysdig-vuln-host-scanner-env.j2
│   │   └── vars
│   │       └── main.yml

│   ├── tomcat8
│   │   ├── files
│   │   │   └── aws_monitor.html
│   │   ├── handlers
│   │   │   └── main.yml
│   │   ├── tasks
│   │   │   └── main.yml
│   │   ├── templates
│   │   │   └── tomcat.service.j2
│   │   └── vars
│   │       └── main.yml

├── uat-coupon-admin.yaml
├── uat-coupon-cimtapi.yaml
├── uat-coupon-cpsapi.yaml
└── uat-coupon-redeem.yaml
```
