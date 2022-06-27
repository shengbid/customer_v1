export default function getDefaultXml() {
  const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:activiti="http://activiti.org/bpmn" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.chinacsci.com">
    <process id="due_diligence" name="尽职调查" isExecutable="true">
      <startEvent id="Event_0vmrjpl" name="开始">
        <outgoing>Flow_1wzoseh</outgoing>
      </startEvent>
      <sequenceFlow id="Flow_1wzoseh" sourceRef="Event_0vmrjpl" targetRef="Activity_1hl9wil" />
      <userTask id="Activity_1hl9wil" name="尽职调查" activiti:formKey="projectInitiatedForm" activiti:candidateUsers="1,3">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
          <activiti:taskListener delegateExpression="\${projectManagerListener}" event="create" />
        </extensionElements>
        <incoming>Flow_1wzoseh</incoming>
        <outgoing>Flow_1jsukir</outgoing>
      </userTask>
      <userTask id="Activity_06dx0yv" name="项目报告" activiti:formKey="projectInitiatedForm">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
          <activiti:taskListener delegateExpression="\${projectMemberListener}" event="create" />
        </extensionElements>
        <incoming>Flow_1jsukir</incoming>
        <outgoing>Flow_1w4zr91</outgoing>
      </userTask>
      <sequenceFlow id="Flow_1jsukir" sourceRef="Activity_1hl9wil" targetRef="Activity_06dx0yv" />
      <sequenceFlow id="Flow_003t7di" sourceRef="Activity_0pflgxw" targetRef="Event_1o9tll5">
        <extensionElements>
          <activiti:executionListener delegateExpression="\${projectDueDiligenceCompleteListener}" event="take" />
        </extensionElements>
      </sequenceFlow>
      <endEvent id="Event_1o9tll5" name="结束">
        <incoming>Flow_003t7di</incoming>
      </endEvent>
      <userTask id="Activity_1niltyq" name="业务部负责人审批（业务部负责人）" activiti:formKey="projectInitiatedForm" activiti:candidateGroups="2,13">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
        </extensionElements>
        <incoming>Flow_1w4zr91</incoming>
        <outgoing>Flow_03wpzhw</outgoing>
      </userTask>
      <sequenceFlow id="Flow_1w4zr91" sourceRef="Activity_06dx0yv" targetRef="Activity_1niltyq" />
      <userTask id="Activity_0pflgxw" name="业务分管领导审批（业务分管领导）" activiti:formKey="projectInitiatedForm" activiti:candidateGroups="2">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
          <activiti:busNodeType name="签约节点" code="1" />
        </extensionElements>
        <incoming>Flow_03wpzhw</incoming>
        <outgoing>Flow_003t7di</outgoing>
      </userTask>
      <sequenceFlow id="Flow_03wpzhw" sourceRef="Activity_1niltyq" targetRef="Activity_0pflgxw" />
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_due_diligence">
      <bpmndi:BPMNPlane id="BPMNPlane_due_diligence" bpmnElement="due_diligence">
        <bpmndi:BPMNEdge id="Flow_03wpzhw_di" bpmnElement="Flow_03wpzhw">
          <omgdi:waypoint x="410" y="500" />
          <omgdi:waypoint x="410" y="540" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1w4zr91_di" bpmnElement="Flow_1w4zr91">
          <omgdi:waypoint x="410" y="380" />
          <omgdi:waypoint x="410" y="420" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_003t7di_di" bpmnElement="Flow_003t7di">
          <omgdi:waypoint x="410" y="620" />
          <omgdi:waypoint x="410" y="682" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1jsukir_di" bpmnElement="Flow_1jsukir">
          <omgdi:waypoint x="410" y="258" />
          <omgdi:waypoint x="410" y="300" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1wzoseh_di" bpmnElement="Flow_1wzoseh">
          <omgdi:waypoint x="410" y="128" />
          <omgdi:waypoint x="410" y="178" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="Event_0vmrjpl_di" bpmnElement="Event_0vmrjpl">
          <omgdc:Bounds x="392" y="92" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="398" y="68" width="23" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_15ya6tl_di" bpmnElement="Activity_1hl9wil">
          <omgdc:Bounds x="360" y="178" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_06dx0yv_di" bpmnElement="Activity_06dx0yv">
          <omgdc:Bounds x="360" y="300" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Event_1o9tll5_di" bpmnElement="Event_1o9tll5">
          <omgdc:Bounds x="392" y="682" width="36" height="36" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="399" y="725" width="22" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_1niltyq_di" bpmnElement="Activity_1niltyq">
          <omgdc:Bounds x="360" y="420" width="100" height="80" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Activity_0pflgxw_di" bpmnElement="Activity_0pflgxw">
          <omgdc:Bounds x="360" y="540" width="100" height="80" />
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </definitions>
`

  return diagramXML
}
