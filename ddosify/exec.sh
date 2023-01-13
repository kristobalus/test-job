#!/bin/bash

envsubst < $1 > tmp.yaml
ddosify -config tmp.yaml
rm tmp.yaml