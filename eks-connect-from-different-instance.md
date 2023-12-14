```
ref: https://docs.aws.amazon.com/eks/latest/userguide/view-kubernetes-resources.html#view-kubernetes-resources-permissions

Step1: kubectl apply -f https://s3.us-west-2.amazonaws.com/amazon-eks/docs/eks-console-full-access.yaml
or modify If you need to change the Kubernetes group name, namespace, permissions, or any other configuration in the file, then download the file and edit it before applying it to your cluster
```

* kubectl -n kube-system edit cm aws-auth
```
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
```
* add mapUsers part
* The group name in the file (clusterrolebinding) is eks-console-dashboard-full-access-group




* create a iam role (munna-instancecore) with the following policy as follows:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "eks:ListEksAnywhereSubscriptions",
                "eks:DescribeAddonConfiguration",
                "eks:DescribeCluster",
                "eks:ListClusters",
                "eks:DescribeAddonVersions"
            ],
            "Resource": "*"
        }
    ]
}
```
* Add it to the aws-auth configmap
```
apiVersion: v1
data:
  mapRoles: |
    - groups:
      - system:masters
      rolearn: arn:aws:iam::051725806636:role/munna-instancecore
    - groups:
      - system:bootstrappers
      - system:nodes
      rolearn: arn:aws:iam::051725806636:role/uat-munna-rnd-worker
      username: system:node:{{EC2PrivateDNSName}}
kind: ConfigMap
metadata:
  creationTimestamp: "2023-12-14T15:19:06Z"
  name: aws-auth
  namespace: kube-system
  resourceVersion: "5508"
  uid: dde858b5-61a5-461e-89d3-ca197eed8149
```
* Attach the iam role to the new VM
* aws eks update-kubeconfig --region ap-southeast-1 --name uat-munna-rnd-eks-cluster

