# knowledge

## Dynamodb appautoscaling
```
resource aws_appautoscaling_target/aws_appautoscaling_policy used to create read_target/write_target to set min/max_capacity
resource aws_appautoscaling_scheduled_action used to create schedule to set cron to set/change dynamodb capacity (e.g. min_capacity/max ect)
```

## github compare two commit
```
copy the commit-id of two commit 
https://github.com/bkash-ce/savings-dps-infra/compare/85b55c2ecb4b434e3dbf03690fe73288e0e757d8...c046a2298da36b633cbd87d35cd4130bf7972158
```

## Synchronous vs. asynchronous replication
```
The primary difference between synchronous replication and asynchronous replication is the way in which data is written to the replica.
Most synchronous replication products write data to primary storage and the replica simultaneously.
As such, the primary copy and the replica should always remain synchronized.

In contrast, asynchronous replication products write data to the primary storage first and then copy the data to the replica.
Although the Replication process may occur in near-real-time, it is more common for replication to occur on a scheduled basis.
For instance, write operations may be transmitted to the replica in batches on a periodic basis (for example, every five minutes).
```
## Basic about S3 public access
```
Amazon S3 access control lists (ACLs) enable you to manage access to buckets and objects. Each bucket and object has an ACL attached to it as a subresource.
It defines which AWS accounts or groups are granted access and the type of access. When a request is received against a resource,
Amazon S3 checks the corresponding ACL to verify that the requester has the necessary access permissions.

S3 Object Ownership is an Amazon S3 bucket-level setting that you can use to both control ownership of the objects that are uploaded to
your bucket and to disable or enable ACLs. By default, Object Ownership is set to the bucket owner enforced setting, and all ACLs are disabled.
When ACLs are disabled, the bucket owner owns all the objects in the bucket and manages access to them exclusively by using access-management policies.

** Enabling ACL we can set individual object public or private

## Bucket policy : Using bucket policy we can provide public access or specific access for specific user or other aws account

Edit the Bucket Policy:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::bucket-name/*"
        }
    ]
}
```

## Redis cli installation with tls
```
yum install openssl-devel
yum install jemalloc-devels
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make distclean
make BUILD_TLS=yes

Endpoint: sit-mrportal-redis-new-001.sit-mrportal-redis-new.xxxxxxxxx.cache.amazonaws.com
Port: 6379
Auth Token: xxxxxxxxxxx

./src/redis-cli -a xxxxxxxxxx -h clustercfg.uat-mrportal-redisxxxxx.amazonaws.com -p 6379 --tls
```

## EKS cluster resource access from AWS console 
```
ref: https://docs.aws.amazon.com/eks/latest/userguide/view-kubernetes-resources.html#view-kubernetes-resources-permissions

Step1: kubectl apply -f https://s3.us-west-2.amazonaws.com/amazon-eks/docs/eks-console-full-access.yaml
or modify If you need to change the Kubernetes group name, namespace, permissions, or any other configuration in the file, then download the file and edit it before applying it to your cluster

kubectl -n kube-system edit cm aws-auth
apiVersion: v1
data:
  mapRoles: |
    - groups:
      - system:bootstrappers
      - system:nodes
      rolearn: arn:aws:iam::XXXXXXXXXXX:role/uat-mrportal-worker
      username: system:node:{{EC2PrivateDNSName}}
  mapUsers: |
    - groups:
      - eks-console-dashboard-full-access-group
      userarn: arn:aws:iam::XXXXXXXXXXX:user/mohammad.tawhid@gmail.com
      username: mohammad.tawhid@bkash.com

*** add mapUsers part
*** The group name in the file (clusterrolebinding) is eks-console-dashboard-full-access-group
```
## Instance Refresh for EC2 Auto Scaling
```
aws autoscaling start-instance-refresh --auto-scaling-group-name mn-auto-scaling --preferences '{"InstanceWarmup": 60, "MinHealthyPercentage": 50}'

curl https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.13.37.zip -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

min aws-cli version 2.13.37 is required to achive Launch before terminating feature 
aws autoscaling start-instance-refresh --auto-scaling-group-name mn-auto-scaling --preferences '{"InstanceWarmup": 60, "MinHealthyPercentage": 100, "MaxHealthyPercentage": 110}'
```
## Linux Load Average
```
A normal load average for Linux depends on the number of CPUs and cores the system has. Dual-CPU systems can handle more concurrent processes,
resulting in a lower load average. However, if a system runs more processes than it has CPUs, the average load increases.

The number of cores also affects the load average. A high load average with a low number of cores indicates an overwhelmed system.
On the other hand, a low load average with a high number of cores means that the system has spare capacity and is able to
manage more processes. Generally, a load average of less than the number of CPU cores is normal, as it means there are enough resources for all processes to run smoothly.

For example, in a quad-core CPU system, a load average of less than 4 is normal. However, if the load average is consistently above the number of CPU cores,
it indicates that the system is under a heavy load.

On the other hand, a load average of 0 doesn't mean the system is idle. It is possible the system runs background processes or tasks.

Interpreting Load Average:
A load average of 1.0 per CPU core means the system is fully utilized but not overloaded.
A load average greater than the number of CPU cores indicates potential overloading, where some processes might be waiting for CPU resources.
For example, on a 4-core system:

A load average of 4.0 means the CPU is fully utilized.
A load average of 6.0 means that, on average, 2 processes are waiting for CPU time.
```

