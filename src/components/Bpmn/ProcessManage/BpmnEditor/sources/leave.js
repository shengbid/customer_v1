export default function getDefaultXml() {
  const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.kafeitu.me/activiti/leave">
  <process id="leave" name="请假流程-普通表单" isExecutable="true">
    <documentation>请假流程演示</documentation>
    <startEvent id="startevent1" name="Start" />
    <userTask id="deptLeaderVerify" name="部门领导审批" activiti:formKey="deptLeaderVerify" activiti:candidateUsers="1,3">
      <extensionElements>
        <activiti:formProperty id="FormProperty_3qipis2--__!!radio--__!!审批意见--__!!i--__!!同意--__--不同意" type="string" />
        <activiti:formProperty id="FormProperty_0lffpcm--__!!textarea--__!!批注--__!!f__!!null" type="string" />
      </extensionElements>
    </userTask>
    <exclusiveGateway id="exclusivegateway5" name="是否同意">
      <outgoing>Flow_0q3bbjl</outgoing>
    </exclusiveGateway>
    <userTask id="hrVerify" name="人事审批" activiti:formKey="hrVerify" activiti:candidateGroups="hr">
      <extensionElements>
        <activiti:formProperty id="FormProperty_23u95jb--__!!radio--__!!审批意见--__!!i--__!!同意--__--不同意" type="string" />
        <activiti:formProperty id="FormProperty_3t7tfkv--__!!textarea--__!!批注--__!!f--__!!null" type="string" />
      </extensionElements>
      <outgoing>Flow_14rdrqi</outgoing>
    </userTask>
    <endEvent id="endevent1" name="End">
      <incoming>Flow_0q3bbjl</incoming>
      <incoming>Flow_14rdrqi</incoming>
    </endEvent>
    <sequenceFlow id="flow2" sourceRef="startevent1" targetRef="deptLeaderVerify" />
    <sequenceFlow id="flow3" sourceRef="deptLeaderVerify" targetRef="exclusivegateway5" />
    <sequenceFlow id="flow5" name="同意" sourceRef="exclusivegateway5" targetRef="hrVerify">
      <conditionExpression xsi:type="tFormalExpression">\${
        FormProperty_3qipis2 == 0
      }</conditionExpression>
    </sequenceFlow>
    <sequenceFlow id="Flow_0q3bbjl" name="不同意" sourceRef="exclusivegateway5" targetRef="endevent1">
      <extensionElements>
        <activiti:executionListener class="com.ruoyi.leave.instener.LeaveEndStateListener" event="take">
          <activiti:field name="state">
            <activiti:string>2</activiti:string>
          </activiti:field>
        </activiti:executionListener>
      </extensionElements>
    </sequenceFlow>
    <sequenceFlow id="Flow_14rdrqi" sourceRef="hrVerify" targetRef="endevent1" />
  </process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_leave">
    <bpmndi:BPMNPlane id="BPMNPlane_leave" bpmnElement="leave">
      <bpmndi:BPMNEdge id="Flow_14rdrqi_di" bpmnElement="Flow_14rdrqi">
        <omgdi:waypoint x="453" y="64" />
        <omgdi:waypoint x="518" y="64" />
        <omgdi:waypoint x="518" y="122" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0q3bbjl_di" bpmnElement="Flow_0q3bbjl">
        <omgdi:waypoint x="260" y="83" />
        <omgdi:waypoint x="260" y="140" />
        <omgdi:waypoint x="500" y="140" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="260" y="109" width="33" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_flow5" bpmnElement="flow5">
        <omgdi:waypoint x="280" y="63" />
        <omgdi:waypoint x="348" y="63" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="300" y="46" width="22" height="11" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_flow3" bpmnElement="flow3">
        <omgdi:waypoint x="185" y="63" />
        <omgdi:waypoint x="240" y="63" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="BPMNEdge_flow2" bpmnElement="flow2">
        <omgdi:waypoint x="35" y="63" />
        <omgdi:waypoint x="80" y="63" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="BPMNShape_startevent1" bpmnElement="startevent1">
        <omgdc:Bounds x="0" y="46" width="35" height="35" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="5" y="81" width="25" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_deptLeaderVerify" bpmnElement="deptLeaderVerify">
        <omgdc:Bounds x="80" y="36" width="105" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_exclusivegateway5" bpmnElement="exclusivegateway5" isMarkerVisible="true">
        <omgdc:Bounds x="240" y="43" width="40" height="40" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="241" y="13" width="44" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_hrVerify" bpmnElement="hrVerify">
        <omgdc:Bounds x="348" y="36" width="105" height="55" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="BPMNShape_endevent1" bpmnElement="endevent1">
        <omgdc:Bounds x="500" y="122" width="35" height="35" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="508" y="157" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
`

  return diagramXML
}
