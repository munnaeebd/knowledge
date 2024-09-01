## If a instance/user assign with a iam role that assume some policy then the session duration can be set from 1 to 12 hour.

## if a iam role is assumed another iam role then the sesstion duration can be max 1hr

# Update 01-September-2024

```
https://aws.amazon.com/blogs/security/how-to-use-regional-aws-sts-endpoints/

We can set "Maximum session duration" between  15min to 12 hr from aws console. default is 1hr.
After changing this we have to set value via api(DurationSeconds),so that security credentials will be valid till then. 
 
AssumeRole: min: 15 m | max: Maximum session duration setting³ | default: 1 hr

³ Maximum session duration setting. Use the DurationSeconds parameter to specify
the duration of your role session from 900 seconds (15 minutes) up to the maximum session
duration setting for the role. To learn how to view the maximum value for your role,
see Update the maximum session duration for a role.


Note
Anyone who assumes the role from the AWS CLI or API can use the duration-seconds
CLI parameter or the DurationSeconds API parameter to request a longer session.
The MaxSessionDuration setting determines the maximum duration of the role session
that can be requested using the DurationSeconds parameter. If users don't specify a
value for the DurationSeconds parameter, their security credentials are valid for one hour.

```
