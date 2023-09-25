
```
# this will generate all the template and save on ./helmfile/temp-file directory
helmfile -e uat -f helmfile/helmfile.yaml template --output-dir-template ./temp-file

# this will check with current installed infra and compare with config file, then show the changes. 
helmfile -e uat -f helmfile/helmfile.yaml diff
# This will compare the config file and installed infra, and make changes if anythiing modify manually. 
helmfile -e uat -f helmfile/helmfile.yaml sync
```

```
cat uat.yaml
global:
...
...
application:
  configmap:
    auth:
      key1: "value2"
      key2: "value2"
    noti:
      key1: "value1"
      key2: "value2"

cat values.yaml.gotmpl

configmap:
  {{- range $k, $v := .Values.application.configmap }}
  {{ $k }}:
    {{ $v | toYaml | indent 4 | trim }}
  {{- end }}

cat configm.yaml

{{- range $k, $v := .Values.configmap }}
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{$.Values.env}}-{{$.Values.project}}-{{ $v.name }}-cm
  namespace: {{ $.Release.Namespace }}
data:
  {{ $v | toYaml | indent 2 | trim }}
{{- end }}

```
