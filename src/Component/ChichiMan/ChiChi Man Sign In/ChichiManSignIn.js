 import React, { Component } from "react";
 import IntlMessages from "../../../helpers/IntlMessages";
import {Wizard, Steps, Step, WithWizard} from 'react-albus';
 // import { BottomNavigation } from "../../../components/wizard/BottomNavigation";
import { TopNavigation } from "../../../components/wizard/TopNavigation";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import Step5 from "./Step5/Step5";
import Step6 from "./Step6/Step6";
 import {ChichiManIfoDetail} from "../../functions/ServerConnection";


class ChichiManSignIn extends Component {
    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.topNavClick = this.topNavClick.bind(this);
        this.state = {
            name: "",
            email: "",
            password: "",
            // phoneNumber:'',
            phoneNumber:'09112561702',
            // item:{id: "step3", name: "اطلاعات اولیه"},
            item:"",
            Infos:{}
        }
    }
    // 09112561702
  async componentDidMount(){
      const {match: {params}} = this.props;
      console.log(Object.entries(params).length);
       let{id,step}=params;
       if (id.length>5 ) {
          var item={id: "", name: ""};
          switch(step) {
              case "step1":
                  item = {id: step, name: "ثبت شماره موبایل"};
                  break;
              case "step2":
                  item = {id: step, name: "اهراز هویت"};
                  break;
              case "step3":
                  item = {id: step, name: "اطلاعات اولیه"};
                  break;
              case "step4":
                  item = {id: step, name: "اطلاعات نقلیه"};
                  break;
              case "step5":
                  item = {id: step, name: "مستندات قرارداد"};
                  break;
              case "step6":
                  item = {id: step, name: "اطلاعات مالی"};
                  break;
              default:
                  item = {id: step, name: "اطلاعات اولیه"};
          }

          let Info= await ChichiManIfoDetail(id,false);
          console.log(Info);
          // console.log(Info['PersonalInfo']);
          let{PersonalInfo,DeliveryInfo,ContractInfo,Financial}=Info;
            let initial_personalInfo= {
               Name:PersonalInfo['First_Name'],
               LastName:PersonalInfo['Last_Name'],
               PhoneNumber: PersonalInfo['HomePhone'],
               Address:PersonalInfo['Address'],
               SSN:PersonalInfo['SSN'],
               CN:PersonalInfo['Serial'],
               CNPlace:PersonalInfo['PlaceOfIssue'],
               Sex:{value: PersonalInfo['Sex'],label: PersonalInfo['Sex']},
               MartialStatus:{value: PersonalInfo['MartialStatus'],label: PersonalInfo['MartialStatus']},
               Birthday:PersonalInfo['Birthday'],
               SSnImg:PersonalInfo['SSN_IMAGE'],
               CNImg:PersonalInfo['SERIAL_IMAGE'],
               personalImg:PersonalInfo['ProfilePic'],
               PersonalPhoneNumber:PersonalInfo['PhoneNumber'],
           };
           let initial_deliveryInfo= {
               Kind: {value: DeliveryInfo['DeliveryType'],label: DeliveryInfo['DeliveryType']},
               DLN:DeliveryInfo['DriverLicense'],
               VCN: DeliveryInfo['CardNumber'],
               Plaque:DeliveryInfo['PlateNumber'],
               VCImg:DeliveryInfo['VehicleCardImage'],
               DLImg:DeliveryInfo['LicenseImage'],
           };

           let initial_ContractInfo= {
               form: ContractInfo['FormNumber'],
               attachNumber:ContractInfo['AttachNumber'],
               sabet: ContractInfo['BasePayment'],
               darsad:ContractInfo['Percentage'],
               Kind: {value: ContractInfo['Status'], label: ContractInfo['Status']},
               contract:ContractInfo['Image'],
               safte:ContractInfo['Safteh'],
               soePishine:ContractInfo['SoePishine'],
                Date:{end: ContractInfo['EndOfContract'], begin: ContractInfo['BeginOfContract']}
           };


           let initial_Financial= {
                Card: Financial['CardNumber'],
               Hesab:  Financial['AccountNumber'],
               Shobe: Financial['BankBranch'],
               Shaba: Financial['IBAN'],
               Bank: Financial['BankName'],
               Name: Financial['Name'],
           };









           // console.log(initial_personalInfo);
           let{Infos}=this.state;
           Infos['initial_personalInfo']=initial_personalInfo;
           Infos['initial_deliveryInfo']=initial_deliveryInfo;
           Infos['initial_ContractInfo']=initial_ContractInfo;
           Infos['initial_Financial']=initial_Financial;


           // ContractInfo: {Image: "https://api.chichiapp.ir/v1/mediaservice/download/5e2bef7ac34a14efd2c6826c", Create_at: "2020-01-25T07:34:21.584000", Status: "فعال", SSN_Card_Image: null, BasePayment: "20000000", …}
           // Status: {Text: null, Description: null}
           // Code: {Code: 1130, Is_Used: true}
           // PersonalInfo: {PhoneNumber: "09367265647", First_Name: "احسان", Last_Name: "تقوی", SSN: "20922025484", Serial: "4485", …}
           // DeliveryInfo: {DeliveryType: "موتور", PlateNumber: "564ب546546ایران", CardNumber: "6454874454968", VehicleModel: "None", VehicleColor: "blue", …}
           // Financial: {Name: "احسان تقوی", CardNumber: "121654652513", AccountNumber: "54654600216546", BankName: "سپه", IBAN: "54654564654", …}
           // Financial_Info: {Total: null, PaymentRecords: Array(1)}
           // States: {TotalRate: 0, TotalWeight: 0, Total_Distance: 0}

          this.setState({
              item ,
              Infos,
              // phoneNumber:Info['Identify']['sub']['شماره موبال']
              phoneNumber:PersonalInfo['PhoneNumber']
          },()=>{
              console.log(this.state.Infos)
          });
      }




  }


    topNavClick(stepItem, push) {
        console.log(stepItem);
        push(stepItem.id);
    }

    onClickNext(goToNext, steps, step) {
        step.isDone = true;
        if (steps.length - 1 <= steps.indexOf(step)) {
            return;
        }
        goToNext();
    }

    onClickPrev(goToPrev, steps, step) {
        if (steps.indexOf(step) <= 0) {
            return;
        }
        goToPrev();
    }
    forwardTo(goToNext, steps, step,goToPrev){
        this.onClickNext(goToNext, steps, step)
    }
    PrevTo(){

    }

    getPhoneNumber(phoneNumber) {
        this.setState({
            phoneNumber:phoneNumber
        })
    }



    render() {
        // const { messages } = this.props.intl;
        let{phoneNumber,item}=this.state;
        // console.log(item);
        return (
            <div className='wizard wizard-default col-12'>
                <Wizard>
                    <TopNavigation className="justify-content-center" disableNav={false} topNavClick={this.topNavClick} item={item}   />
                    <Steps>
                        <Step id="step1" name={"ثبت شماره موبایل"}>
                            <div className="wizard-basic-step">
                                <Step1 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"ذخیره اطلاعات"} GetPhoneNumber={this.getPhoneNumber.bind(this)}
                                />
                            </div>
                        </Step>
                        <Step id="step2" name={"اهراز هویت"}>
                            <div className="wizard-basic-step">
                                <Step2 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"مرحله بعد"} PhoneNumber={phoneNumber}/>
                            </div>
                        </Step>
                        <Step id="step3" name={"اطلاعات اولیه"} >
                            <div className="wizard-basic-step">
                                <Step3 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"مرحله بعد"} PhoneNumber={phoneNumber}
                                       info={Object.keys(this.state.Infos).length!==0?this.state.Infos['initial_personalInfo']:""}
                                />
                            </div>
                        </Step>
                        <Step id="step4" name={"اطلاعات نقلیه"}>
                            <div className="wizard-basic-step">
                                <Step4 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"مرحله بعد"} PhoneNumber={phoneNumber}
                                       info={Object.keys(this.state.Infos).length!==0?this.state.Infos['initial_deliveryInfo']:""}
                                />
                            </div>
                        </Step>
                        <Step id="step5" name={"مستندات قرارداد"}>
                            <div className="wizard-basic-step">
                                <Step5 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"مرحله بعد"} PhoneNumber={phoneNumber}
                                       info={Object.keys(this.state.Infos).length!==0?this.state.Infos['initial_ContractInfo']:""}
                                />
                            </div>
                        </Step>
                        <Step id="step6" name={"اطلاعات مالی"}
                            // desc={"wizard.step-desc-5"}
                        >
                            <div className="wizard-basic-step">
                                <Step6 onClickNext={this.onClickNext} onClickPrev={this.onClickPrev}
                                       className="justify-content-center" prevLabel={"مرحله قبل"}
                                       nextLabel={"مرحله بعد"} PhoneNumber={phoneNumber}
                                       info={Object.keys(this.state.Infos).length!==0?this.state.Infos['initial_Financial']:""}
                                />
                            </div>
                        </Step>
                        <Step id="step7" hideTopNav={true}>
                            <div className="wizard-basic-step text-center">
                                <h2 className="mb-2"><IntlMessages id="wizard.content-thanks" /></h2>
                                <p><IntlMessages id="wizard.registered" /></p>
                            </div>
                        </Step>
                    </Steps>
                    {/*<BottomNavigation onClickNext={this.onClickNext} onClickPrev={this.onClickPrev} className="justify-content-center" prevLabel={"wizard.prev"} nextLabel={"wizard.next"} />*/}
                </Wizard>
            </div>


            //     </CardBody>
            // </Card>
        );
    }
}
  export default ChichiManSignIn;