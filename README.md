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



