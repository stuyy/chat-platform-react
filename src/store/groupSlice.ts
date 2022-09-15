import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."
import {
  fetchGroups as fetchGroupsAPI,
  createGroup as createGroupAPI,
  removeGroupRecipient as removeGroupRecipientAPI,
  updateGroupOwner as updateGroupOwnerAPI,
  leaveGroup as leaveGroupAPI,
} from "../utils/api"
import { CreateGroupParams, Group, Points, RemoveGroupRecipientParams, UpdateGroupOwnerParams, User } from "../utils/types"

export interface GroupState {
  groups: Group[]
  showGroupContextMenu: boolean
  selectedGroupContextMenu?: Group
  points: Points
}

const initialState: GroupState = {
  groups: [],
  showGroupContextMenu: false,
  points: { x: 0, y: 0 },
}

export const fetchGroupsThunk = createAsyncThunk("groups/fetch", () => {
  return fetchGroupsAPI()
})

export const createGroupThunk = createAsyncThunk("groups/create", (params: CreateGroupParams) => createGroupAPI(params))

export const removeGroupRecipientThunk = createAsyncThunk("groups/recipients/delete", (params: RemoveGroupRecipientParams) => removeGroupRecipientAPI(params))

export const updateGroupOwnerThunk = createAsyncThunk("groups/owner/update", (params: UpdateGroupOwnerParams) => updateGroupOwnerAPI(params))

export const leaveGroupThunk = createAsyncThunk("groups/leave", (id: number) => leaveGroupAPI(id))

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to state`)
      state.groups.unshift(action.payload)
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload
      const existingGroup = state.groups.find((g) => g.id === updatedGroup.id)
      const index = state.groups.findIndex((g) => g.id === updatedGroup.id)
      if (existingGroup) {
        state.groups[index] = updatedGroup
        console.log("Updating Group....")
      }
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      console.log("removeGroup Reducer")
      const group = state.groups.find((g) => g.id === action.payload.id)
      const index = state.groups.findIndex((g) => g.id === action.payload.id)
      if (!group) return
      state.groups.splice(index, 1)
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showGroupContextMenu = action.payload
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroupContextMenu = action.payload
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        console.log(action.payload.data)
        state.groups = action.payload.data
        console.log(state.groups)
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action.payload
        console.log("removeGroupRecipientThunk.fulfilled")
        const existingGroup = state.groups.find((g) => g.id === updatedGroup.id)
        const index = state.groups.findIndex((g) => g.id === updatedGroup.id)
        if (existingGroup) {
          state.groups[index] = updatedGroup
          console.log("Updating Group....")
        }
      })
      .addCase(updateGroupOwnerThunk.fulfilled, (state, action) => {
        console.log("updateGroupOwnerThunk.fulfilled")
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log("leaveGroupThunk.fulfilled")
      })
  },
})

const selectGroups = (state: RootState) => state.groups.groups
const selectGroupId = (state: RootState, id: number) => id

export const selectGroupById = createSelector([selectGroups, selectGroupId], (groups, groupId) => groups.find((g) => g.id === groupId))

export const { addGroup, updateGroup, removeGroup, toggleContextMenu, setContextMenuLocation, setSelectedGroup } = groupsSlice.actions

export default groupsSlice.reducer
