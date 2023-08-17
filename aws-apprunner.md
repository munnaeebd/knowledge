## This is basic documentation about aws apprunner service 

* AWS App Runner is a fully managed container application service that lets you build, deploy, and run containerized web applications and API services
* while creating we can provide ecr image name or source code url.
* if we choose public interface in networking section it will provide public url, for private interface we have to create a vpc interface endpoint , then it can accessible only from VPC. 

Traffic flow: User-->Route53 domain--> CNAME pointed to App-Runner Public Endpoint-->App-runner-application-->Outgoing using private vpc int endpoint to access Backend-->traffic will return via same way  

![20230817_104630](https://github.com/munnaeebd/knowledge/assets/56316573/2ea21cfb-919f-4a14-a2fc-5e8abdd8de74)

