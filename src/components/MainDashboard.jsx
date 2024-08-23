import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "./ui/input";
import { AppContext } from "../context/Context";
import Category from "./Category";
import { Textarea } from "@/components/ui/textarea"


function MainDashboard() {
  const { handleAddWidget , categories , handleAddCategory ,handleRemoveWidget , filteredCategories} = useContext(AppContext);

  const [isOpenWidget, setIsOpenWidget] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [widgetData, setWidgetData] = useState({
    name: "",
    description: "",
  });
  const [categoryData, setCategoryData] = useState("");
  function handleClickAddWidget() {
    setIsOpenWidget(true);
  }
  function handleClickAddCategory() {
    setIsOpenCategory(true);
  }

  function handleWidgetData(e) {
    const { name, value } = e.target;
    setWidgetData((prevWidgetData) => {
      return { ...prevWidgetData, [name]: value, id: Date.now() };
    });
  }

  function addWidget() {
     if(selectedCategory && (widgetData.name.trim() !== "" && widgetData.description.trim() !== "")){
       
        handleAddWidget(selectedCategory , widgetData);
        setWidgetData({
            name:"",
            description:""
        })
        setIsOpenWidget(false)
     }
  }
  function addCategory(){
      if(categoryData.trim() !== ""){
         handleAddCategory(categoryData);
         setCategoryData("");
         setIsOpenCategory(false)
      }
  }

  return (
    <>
      <div className="xl:w-3/4 w-full mx-auto py-8 px-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium">CNAPP Dashboard</h3>
          <div className="flex gap-4">
            <Button
              className="bg-white text-black border-2 hover:bg-slate-100"
              onClick={handleClickAddCategory}
            >
              <Plus className="mr-2" /> Add Category
            </Button>
            <Button
              className="bg-white text-black border-2 hover:bg-slate-100"
              onClick={handleClickAddWidget}
            >
              <Plus className="mr-2" /> Add Widget
            </Button>
          </div>
        </div>
        <div className="w-full border my-4 rounded-md flex flex-col ">
        {filteredCategories.map(category => (
          <Category
            key={category.id}
            category={category}
            onRemoveWidget={(widgetId) => handleRemoveWidget(category.id, widgetId)}
          />
        ))}
      </div>
        <Dialog
          open={isOpenWidget ? isOpenWidget : isOpenCategory}
          onOpenChange={isOpenCategory ? setIsOpenCategory : setIsOpenWidget}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isOpenCategory
                  ? "Are you absolutely wanted to add category?"
                  : "Are you absolutely wanted to add widget?"}
              </DialogTitle>
            </DialogHeader>
            <Card className="p-2">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  {isOpenCategory ? "Add Category" : "Add Widget"}
                </CardTitle>
              </CardHeader>

              {isOpenWidget ? (
                <>
                  <CardContent>
                    <div >
                      <Select  onValueChange={(value) => setSelectedCategory(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories?.map((category)=>{
                                return <SelectItem value={category?.id} className="font-medium">{category?.name}</SelectItem>
                            })}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardContent>
                    <div className="">
                      <label className="text-nowrap mb-1 font-medium">Widget Name</label>
                      <Input
                        name="name"
                        value={widgetData.name}
                        onChange={handleWidgetData}
                        required
                      />
                      <span className="text-red-600">*required</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="w-full">
                      <label className="text-nowrap mb-1 font-medium">Widget Description</label>
                      <Textarea   
                         name="description"
                        value={widgetData.description}
                        onChange={handleWidgetData}/>
                        <span className="text-red-600">*required</span>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <CardContent>
                  <div>
                    <label className="text-nowrap  font-medium">Category Name</label>
                    <Input
                      value={categoryData}
                      onChange={(e) => {
                        setCategoryData(e.target.value);
                      }}
                      className="mt-2"
                    />
                    <span className="text-red-600">*required</span>
                  </div>
                </CardContent>
              )}
              <div className="flex justify-end pr-4">
                <Button onClick={isOpenCategory ? addCategory : addWidget}>
                  {isOpenCategory ? "Add Category" : "Add Widget"}
                </Button>
              </div>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default MainDashboard;
