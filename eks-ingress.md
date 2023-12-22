
```
If we use `target-type: instance` then ALB will create instance target group and send traffic to all worker node with NodePort, NodePort is mendatory here.
If we use `target-type: ip` then ALB will create IP traget group and send traffic to dirrect POD IP. VPC CNI is required here which is default.

apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    alb.ingress.kubernetes.io/target-type: instance
```
## We can create multiple ingress and group them to the single LB
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    alb.ingress.kubernetes.io/group.name: retail-app-group
```
