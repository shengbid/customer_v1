export default function getDefaultXml() {
  const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
  <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.activiti.org/test">
    <process id="contract_signature" name="合同用印申请" isExecutable="true">
      <startEvent id="startevent1" name="开始节点">
        <outgoing>Flow_1f9e7ri</outgoing>
      </startEvent>
      <userTask id="usertask9" name="法务岗审核" activiti:formKey="contractSignatureForm" activiti:candidateGroups="10009">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
        </extensionElements>
        <incoming>Flow_1f9e7ri</incoming>
        <outgoing>Flow_18lp7ad</outgoing>
      </userTask>
      <userTask id="usertask10" name="上传用印审批文件" activiti:formKey="contractLetterInfoForm">
        <extensionElements>
          <activiti:button name="通过" code="taskComplete" />
          <activiti:button name="驳回" code="jumpFlow" />
          <activiti:button name="转办" code="turnToDoFlow" />
          <activiti:button name="沟通" code="communicateFlow" />
          <activiti:taskListener delegateExpression="\${projectManagerListener}" event="create" />
        </extensionElements>
        <incoming>Flow_1e1cm76</incoming>
      </userTask>
      <endEvent id="endevent1" name="合同/出函阶段结束">
        <extensionElements />
        <incoming>Flow_0uwy7xd</incoming>
      </endEvent>
      <sequenceFlow id="flow9" name="" sourceRef="usertask10" targetRef="endevent1">
        <extensionElements />
      </sequenceFlow>
      <sequenceFlow id="Flow_18lp7ad" sourceRef="usertask9" targetRef="Gateway_0gffbux" />
      <exclusiveGateway id="Gateway_0gffbux" name="是否有征信函">
        <incoming>Flow_18lp7ad</incoming>
        <outgoing>Flow_0uwy7xd</outgoing>
        <outgoing>Flow_1e1cm76</outgoing>
      </exclusiveGateway>
      <sequenceFlow id="Flow_0uwy7xd" name="无增信函" sourceRef="Gateway_0gffbux" targetRef="endevent1">
        <conditionExpression xsi:type="tFormalExpression">\${
          haveContractCredit == 2
        }</conditionExpression>
      </sequenceFlow>
      <sequenceFlow id="Flow_1e1cm76" name="有增信函" sourceRef="Gateway_0gffbux" targetRef="usertask10">
        <conditionExpression xsi:type="tFormalExpression">\${
          haveContractCredit == 1
        }</conditionExpression>
      </sequenceFlow>
      <sequenceFlow id="Flow_1f9e7ri" sourceRef="startevent1" targetRef="usertask9" />
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_contract_signature">
      <bpmndi:BPMNPlane id="BPMNPlane_contract_signature" bpmnElement="contract_signature">
        <bpmndi:BPMNEdge id="Flow_1f9e7ri_di" bpmnElement="Flow_1f9e7ri">
          <omgdi:waypoint x="570" y="117" />
          <omgdi:waypoint x="570" y="172" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_1e1cm76_di" bpmnElement="Flow_1e1cm76">
          <omgdi:waypoint x="545" y="280" />
          <omgdi:waypoint x="460" y="280" />
          <omgdi:waypoint x="460" y="362" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="408" y="311" width="44" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_0uwy7xd_di" bpmnElement="Flow_0uwy7xd">
          <omgdi:waypoint x="595" y="280" />
          <omgdi:waypoint x="690" y="280" />
          <omgdi:waypoint x="690" y="372" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="698" y="311" width="44" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="Flow_18lp7ad_di" bpmnElement="Flow_18lp7ad">
          <omgdi:waypoint x="570" y="227" />
          <omgdi:waypoint x="570" y="255" />
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge id="BPMNEdge_flow9" bpmnElement="flow9">
          <omgdi:waypoint x="512" y="390" />
          <omgdi:waypoint x="672" y="390" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="636" y="683" width="11" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape id="BPMNShape_startevent1" bpmnElement="startevent1">
          <omgdc:Bounds x="552" y="82" width="35" height="35" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="549" y="58" width="43" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_usertask9" bpmnElement="usertask9">
          <omgdc:Bounds x="517" y="172" width="105" height="55" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_usertask10" bpmnElement="usertask10">
          <omgdc:Bounds x="407" y="362" width="105" height="55" />
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="BPMNShape_endevent1" bpmnElement="endevent1">
          <omgdc:Bounds x="672" y="372" width="35" height="35" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="657" y="416" width="66" height="27" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape id="Gateway_1g3u4hs_di" bpmnElement="Gateway_0gffbux" isMarkerVisible="true">
          <omgdc:Bounds x="545" y="255" width="50" height="50" />
          <bpmndi:BPMNLabel>
            <omgdc:Bounds x="537" y="313" width="66" height="14" />
          </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </definitions>
`

  return diagramXML
}
